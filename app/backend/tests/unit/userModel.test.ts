import { expect } from 'chai';
import * as sinon from 'sinon';
import SequelizeUser from '../../src/database/models/SequelizeUser';
import { UserModel } from '../../src/models/UserModel';
import { userMockCreate, usersMock, userMockUpdate } from '../mocks/user.mock';
import e = require('express');

describe('Unit Tests User Model', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('1.1 - getAllUsers', () => {
    it('1.1 - should get all users', async () => {
      // arrange
      const usersMockWithGet = usersMock.map(user => ({
        ...user,
        get: sinon.stub().returns(user)
      }));

      sinon.stub(SequelizeUser, 'findAll').returns(usersMockWithGet as any);
      
      // act
      const userModel = new UserModel();
      const users = await userModel.getAll();

      expect(users).to.eql(usersMock);
    });
  });

  describe('1.2 - getByEmail', () => {
    it('1.2 - should get a user by email', async () => {
      // arrange
      const usersMockWithGet = {
        ...usersMock[0],
        get: sinon.stub().returns(usersMock[0])
      };

      sinon.stub(SequelizeUser, 'findOne').returns(usersMockWithGet as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.getByEmail(usersMock[0].email);

      // assert
      expect(user).to.eql(usersMock[0]);
    });
  });

  describe('1.3 - createUser', () => {
    it('1.3 - should create a user', async () => {
      // arrange
      const usersMockWithGet = {
        ...userMockCreate,
        get: sinon.stub().returns(userMockCreate)
      };

      sinon.stub(SequelizeUser, 'create').returns(usersMockWithGet as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.create(userMockCreate as any);

      // assert
      const { password, ...userWithoutPassword } = userMockCreate;
      expect(user).to.eql(userWithoutPassword);
    });

    it('1.4 - should return null when there are no users', async () => {
      // arrange
      sinon.stub(SequelizeUser, 'findAll').returns(null as any);

      // act
      const userModel = new UserModel();
      const users = await userModel.getAll();

      // assert
      expect(users).to.eql(null);
    });

    it('1.5 - should return null when there are no user', async () => {
      // arrange
      sinon.stub(SequelizeUser, 'findOne').returns(null as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.getByEmail(usersMock[0].email);

      // assert
      expect(user).to.eql(null);
    });

    it('1.6 - should return null when there are no user created', async () => {
      // arrange
      sinon.stub(SequelizeUser, 'create').returns(null as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.create(userMockCreate as any);

      // assert
      expect(user).to.eql(null);
    });
  });

  describe('1.7 - updateUser', () => {
    it('1.7 - should update a user', async () => {
      // arrange
      const updatedUser = {
        id: 1,
        username: 'Admin',
        email: 'admin@admin.com',
        role: 'admin',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      };
      
      sinon.stub(SequelizeUser, 'update').returns([1, [updatedUser]] as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.update(1, userMockUpdate as any);

      // assert
      expect(user).to.deep.equal(updatedUser);
    });

    it('1.8 - should return null when there are no user updated', async () => {
      // arrange
      sinon.stub(SequelizeUser, 'update').returns([0, [userMockUpdate]] as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.update(0, userMockUpdate as any);

      // assert
      expect(user).to.eql(null);
    });

    it('1.9 - should get a user by id', async () => {
      // arrange
      const usersMockWithGet = {
        ...usersMock[0],
        get: sinon.stub().returns(usersMock[0])
      };

      sinon.stub(SequelizeUser, 'findByPk').returns(usersMockWithGet as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.getById(usersMock[0].id);

      // assert
      expect(user).to.eql(usersMock[0]);
    });

    it('1.10 - should return null when there are no user by id', async () => {
      // arrange
      sinon.stub(SequelizeUser, 'findByPk').returns(null as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.getById(usersMock[0].id);

      // assert
      expect(user).to.eql(null);
    });
  });

  describe('1.11 - deleteUser', () => {
    it('1.11 - should delete a user', async () => {
      // arrange
      sinon.stub(SequelizeUser, 'destroy').returns(1 as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.delete(1);

      // assert
      expect(user).to.equal(true);
    });

    it('1.12 - should return false when there are no user deleted', async () => {
      // arrange
      sinon.stub(SequelizeUser, 'destroy').returns(0 as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.delete(0);

      // assert
      expect(user).to.equal(false);
    });

    it('1.13 - should return null when there are no user by id', async () => {
      // arrange
      sinon.stub(SequelizeUser, 'findByPk').returns(null as any);

      // act
      const userModel = new UserModel();
      const user = await userModel.getById(usersMock[0].id);

      // assert
      expect(user).to.eql(null);
    });
  });
});