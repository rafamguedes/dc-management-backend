import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import { usersMock, userMockCreate, userMockUpdate } from '../mocks/user.mock';
import { UserModel } from '../../src/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration User tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('1.1 - getAllUsers', () => {
    it('1.1.1 - should return all users', async function() {
      // arrange
      sinon.stub(UserModel.prototype, 'getAll').resolves(usersMock as any);

      // act
      const res = await chai.request(app).get('/user');

      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(usersMock);
    });
  });

  describe('1.2. validate body registerUser', () => {
    it('1.2.1 - should return 400 if email is not provided', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ password: '123456', name: 'Rafael' });

        // assert
        expect(status).to.equal(400);
    });

    it('1.2.2 - should return 400 if password is not provided', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael@email.com', name: 'Rafael' });

      // assert
      expect(status).to.equal(400);
    });

    it('1.2.3 - should return 400 if name is not provided', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael@email.com', password: '123456' });

      // assert
      expect(status).to.equal(400);
    });

    it('1.2.4 - should return 400 if email is invalid', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael.com', password: '123456', name: 'Rafael' });

      // assert
      expect(status).to.equal(400);
    });

    it('1.2.5 - should return 400 if password is invalid', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael@email.com', password: '123', name: 'Rafael' });

      // assert
      expect(status).to.equal(400);
    });

    it('1.2.6 - should return 400 if name is invalid', async function() {
      // act
      const { status } = await chai.request(app)
        .post('/user').
        send({ email: 'rafael@email.com', password: '123456', name: 'R' });

      // assert
      expect(status).to.equal(400);
    });
  });

  describe('1.3 - registerUser', () => {
    it('1.3.1 - should return user created', async function() {
        // arrange
        sinon.stub(UserModel.prototype, 'getByEmail').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userMockCreate as any);

        // act
        const res = await chai.request(app).post('/user').send(userMockCreate);

        // assert
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(userMockCreate);
    });
  });

  describe('1.4 - updateUser', () => {
    it('1.4.1 - should return user updated', async function() {
      // arrange
      sinon.stub(UserModel.prototype, 'getById').resolves(userMockUpdate as any);
      sinon.stub(UserModel.prototype, 'update').resolves(userMockUpdate as any);

      // act
      const res = await chai.request(app).put('/user/1').send(userMockUpdate);

      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(userMockUpdate);
    });

    it('1.4.2 - should return 404 if user does not exist', async function() {
      // arrange
      sinon.stub(UserModel.prototype, 'getById').resolves(null);

      // act
      const res = await chai.request(app).put('/user/1').send(userMockUpdate);

      // assert
      expect(res.status).to.equal(404);
    });
  });
});

