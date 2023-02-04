import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

import { Response } from 'superagent';

import { mockMatches } from './mocks/mockMatches.test';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rota de partidas', function () {
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
})