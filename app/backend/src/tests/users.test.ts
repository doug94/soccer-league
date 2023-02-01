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

describe('Teste de integração da rota de Login', async function () {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  const badRequestMessage = { message: 'All fields must be filled' };
  const unauthorizedMessage = { message: 'Incorrect email or password' };

  beforeEach(async function () {
    sinon
      .stub(UserModel, "findOne")
      .resolves(mockUser as any);
    sinon
      .stub(jwt, 'verify')
      .callsFake(() => 'user@user.com')
  });

  afterEach(function () {
    sinon.restore();
  })

  it('Deve retornar um token de acesso caso usuário e senha estiverem corretos', async function () {
    const incomingBodyLogin = {
      email: 'abc@123.com',
      password: 'secret_user'
    };
    chaiHttpResponse = await chai.request(app).post('/login').send(incomingBodyLogin);
    expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.be.deep.equal(mockToken);
  });

  it('Deve retornar um erro com status HTTP 400 caso email não for enviado', async function () {
    chaiHttpResponse = await chai.request(app).post('/login').send({ password: 'secret_user' });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal(badRequestMessage);
  });

  it('Deve retornar um erro com status HTTP 400 caso senha não for enviada', async function() {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'user@user.com' });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal(badRequestMessage);
  });

  it('Deve retornar um erro com status HTTP 401 caso email for incorreto', async function () {
    sinon.restore();
    sinon
    .stub(UserModel, "findOne")
    .resolves(undefined);
    const incomingBodyLogin = {
      email: 'user@gmail.com',
      password: 'secret_user'
    };
    chaiHttpResponse = await chai.request(app).post('/login').send(incomingBodyLogin);
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(unauthorizedMessage);
  });

  it('Deve retornar um erro com status HTTP 401 caso senha for incorreta', async function () {
    const incomingBodyLogin = {
      email: 'user@user.com',
      password: 'wrong_password'
    };
    chaiHttpResponse = await chai.request(app).post('/login').send(incomingBodyLogin);
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(unauthorizedMessage);
  });

  it(`Deve retornar a role do usuário ao receber requisição GET na rota 
  /login/validate com o token do usuário como header de authorization`, async function() {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', mockToken.token);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'user' });
  })
});
