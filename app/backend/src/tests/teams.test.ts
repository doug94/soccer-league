import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { Response } from 'superagent';

import { mockTeams } from './mocks/mockTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração da rota de times', function () {
  let chaiHttpResponse: Response;

  it('Deve retornar todos os times corretamente', async function () {
    sinon.stub(Teams, 'findAll').resolves(mockTeams as any);
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams);
    sinon.restore();
  })

  it('Deve retornar o time correspondente com o id no parâmetro da URL', async function () {
    sinon.stub(Teams, 'findByPk').resolves(mockTeams[1] as any);
    chaiHttpResponse = await chai.request(app).get('/teams/2');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams[1]);
    sinon.restore();
  })
})