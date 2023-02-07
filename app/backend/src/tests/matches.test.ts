import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

import { Response } from 'superagent';

import { mockMatches } from './mocks/mockMatches';
import { mockUser } from './mocks/mockUser';

chai.use(chaiHttp);

const { expect } = chai;

import { mockToken } from './mocks/token';
import { userInfo } from 'os';
import Users from '../database/models/UserModel';
import Teams from '../database/models/TeamsModel';

describe('Teste de integração da rota de partidas', function () {
  beforeEach(async function() {
    sinon.stub(Users, 'findOne').resolves(mockUser as any)
  })

  afterEach(function () {
    sinon.restore();
  })

  let chaiHttpResponse: Response;
  it('Deve retornar todas as partidas corretamente', async function () {
    sinon.stub(Matches, 'findAll').resolves(mockMatches as any);
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches);
  })

  it('Deve retornar todas as partidas em andamento', async function() {
    const ongoingMatches = mockMatches.filter((match) => match.inProgress)
    sinon.stub(Matches, 'findAll').resolves(ongoingMatches as any);
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(ongoingMatches);
  })

  it('Deve retornar todas as partiads finalizadas', async function() {
    const finishedMatches = mockMatches.filter((match) => !match.inProgress);
    sinon.stub(Matches, 'findAll').resolves(finishedMatches as any);
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(finishedMatches);
  })

  it('Não deve ser possível criar partidas com token inválido', async function() {
    const errorMessage = { message: 'Token must be a valid token' };
    const incomingTeam = {
      homeTeamId: 16,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    };
    chaiHttpResponse = await chai.request(app).post('/matches').send(incomingTeam);
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(errorMessage);
  })

  it('Não deve ser possível criar partidas com dois times iguals', async function() {
    const { token } = mockToken;
    const errorMessage = { message: 'It is not possible to create a match with two equal teams' };
    const incomingTeam = {
        homeTeamId: 8,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
    }
    chaiHttpResponse = await chai.request(app).post(
      '/matches').set('Authorization', token).send(incomingTeam);
    // console.log(chaiHttpResponse);
    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal(errorMessage);
  })

  it('Não deve ser possível criar partidas com times que não existem', async function() {
    sinon.stub(Teams, 'findByPk').resolves(null);
    const { token } = mockToken;
    const errorMessage = { message: 'There is no team with such id!' };
    const incomingTeam = {
      homeTeamId: 68,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }
    chaiHttpResponse = await chai.request(app).post(
      '/matches').set('Authorization', token).send(incomingTeam);
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal(errorMessage);
  })
})