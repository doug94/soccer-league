import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import { mockLeaderboard } from './mocks/mockLeaderboard';
import { mockMatches } from './mocks/mockMatches';
import { mockTeams } from './mocks/mockTeams';
import Teams from '../database/models/TeamsModel';

describe('Teste de integração da rota da tabela de classificação', function () {
  beforeEach(async function() {
    sinon.stub(Matches, 'findAll').resolves(mockMatches as any)
    sinon.stub(Teams, 'findAll').resolves(mockTeams as any);
  })

  afterEach(function () {
    sinon.restore();
  })

  let chaiHttpResponse: Response;
  
  it('Deve retornar a tabela de classificação geral na rota /leaderboard', async function () {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockLeaderboard)
  })
})