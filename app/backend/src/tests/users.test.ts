import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

import { mockToken } from './mocks/token';
import { mockUser } from './mocks/mockUser';
import incomingBodyLogin from './mocks/incomingBodyLogin';

describe('Teste de integração da rota de Login', async function () {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  const badRequestMessage = { message: 'All fields must be filled' };

  beforeEach(async function () {
    sinon
      .stub(UserModel, "findOne")
      .resolves(mockUser as any);
    sinon
      .stub(jwt, 'sign')
      .resolves(mockToken);
  });

  afterEach(function () {
    (UserModel.findOne as sinon.SinonStub).restore();
    (jwt.sign as sinon.SinonStub).restore();
  })

  it('Deve retornar um token de acesso caso usuário e senha estiverem corretos', async function () {
    chaiHttpResponse = await chai.request(app).post('/login').send(incomingBodyLogin);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockToken);
  });

  it('Deve retornar um erro com status http 400 caso email não for enviado', async function () {
    chaiHttpResponse = await chai.request(app).post('/login').send({ password: 'secret_user' });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal(badRequestMessage);
  });

  it('Deve returnar um erro com status http 400 caso senha não for enviada', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'user@user.com' });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal(badRequestMessage);
  });
});
