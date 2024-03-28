import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import { usersMock, userMockCreate } from '../mocks/user.mock';
import { UserModel } from '../../src/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('1. Integration User tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('1.1. getAllUsers', () => {
    it('should return all users', async function() {
      // arrange
      sinon.stub(UserModel.prototype, 'getAllUsers').resolves(usersMock as any);

      // act
      const res = await chai.request(app).get('/user');

      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(usersMock);
    });
  });

  describe('1.2. validate body registerUser', () => {
    it('2.1 - should return 400 if email is not provided', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ password: '123456', name: 'Rafael' });

        // assert
        expect(status).to.equal(400);
    });

    it('2.2 - should return 400 if password is not provided', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael@email.com', name: 'Rafael' });

      // assert
      expect(status).to.equal(400);
    });

    it('2.3 - should return 400 if name is not provided', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael@email.com', password: '123456' });

      // assert
      expect(status).to.equal(400);
    });

    it('2.4 - should return 400 if email is invalid', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael.com', password: '123456', name: 'Rafael' });

      // assert
      expect(status).to.equal(400);
    });

    it('2.5 - should return 400 if password is invalid', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael@email.com', password: '123', name: 'Rafael' });

      // assert
      expect(status).to.equal(400);
    });

    it('2.6 - should return 400 if name is invalid', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael@email.com', password: '123456', name: 'R' });

      // assert
      expect(status).to.equal(400);
    });
  });

  describe('1.2. registerUser', () => {
    it('should return user created', async function() {
        // arrange
        sinon.stub(UserModel.prototype, 'getByEmail').resolves(null);
        sinon.stub(UserModel.prototype, 'createUser').resolves(userMockCreate as any);

        // act
        const res = await chai.request(app).post('/user').send(userMockCreate);

        // assert
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(userMockCreate);
    });
  });
});

