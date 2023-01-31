import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

import { mockToken } from './mocks/token';
import incomingBodyLogin from './mocks/incomingBodyLogin';

describe('Teste de integração da rota de Login', function () {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(mockToken as any);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Deve retornar um token de acesso caso usuário e senha estiverem corretos', async function () {
    chaiHttpResponse = await chai.request(app).post('/login').send(incomingBodyLogin);
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockToken);
  });
});
