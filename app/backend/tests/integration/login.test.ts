import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../src/app';
import { JwtService } from '../../src/utils/JwtService';
import { tokenMock } from '../mocks/user.mock';
import { LoginService } from '../../src/services/LoginService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration Login tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('1.0 - Validate Body Login', () => {

    it('1.1 - should return 400 if email is not provided', async function() {
      // act
      const { status } = await chai.request(app).post('/login').send({ password: '123456' });

      // assert
      expect(status).to.equal(400);
    });

    it('1.2 - should return 400 if password is not provided', async function() {
      // act
      const { status } = await chai.request(app).post('/login').send({ email: 'rafael@gmail.com' });

      // assert
      expect(status).to.equal(400);
    });

    it('1.3 - should return 401 if email is invalid', async function() {
      // act
      const { status } = await chai.request(app).post('/login').send({ email: 'rafael@gmail.com', password: '123456' });

      // assert
      expect(status).to.equal(401);
    });

    it('1.4 - should return 401 if password is invalid', async function() {
      // act
      const { status } = await chai.request(app).post('/login').send({ email: 'rafael@gmail.com', password: '123456' });

      // assert
      expect(status).to.equal(401);
    });
  });

  describe('2.0 - Authenticate user', () => {
    it('2.1 - should return token and status 200', async function() {
      // arrange
      sinon.stub(JwtService, 'createToken').returns(tokenMock);
        
      // act
      const request = { email: 'rick@admin.com', password: 'secret_admin' };
    
      const res = await chai.request(app).post('/login').send(request);
  
      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ token: tokenMock })
    });
  });

  describe('2.2 - Fetch user role', () => {
    it('should return role and status 200', async function() {
      // arrange
      const email = 'test@example.com';
      const role = 'admin';
      sinon.stub(JwtService, 'verifyToken').returns({ email, role } as any);
      sinon.stub(LoginService.prototype, 'fetchUserRole').withArgs(email).resolves({ status: 'SUCCESSFUL', data: { role } });
    
      // act
      const res = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${tokenMock}`);
    
      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ role });
    });
  });
});
