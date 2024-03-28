import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import { usersMock } from '../mocks/user.mock';
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
});
