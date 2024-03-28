import { expect } from 'chai';
import * as sinon from 'sinon';
import SequelizeUser from '../../src/database/models/SequelizeUser';
import { UserModel } from '../../src/models/UserModel';
import { userMockCreate, usersMock } from '../mocks/user.mock';

describe('Unit Tests User Model', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('1.1 - should get all users', async () => {
    // arrange
    const usersMockWithGet = usersMock.map(user => ({
      ...user,
      get: sinon.stub().returns(user)
    }));

    sinon.stub(SequelizeUser, 'findAll').returns(usersMockWithGet as any);
    
    // act
    const userModel = new UserModel();
    const users = await userModel.getAllUsers();

    expect(users).to.eql(usersMock);
  });

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

  it('1.3 - should create a user', async () => {
    // arrange
    const usersMockWithGet = {
      ...userMockCreate,
      get: sinon.stub().returns(userMockCreate)
    };

    sinon.stub(SequelizeUser, 'create').returns(usersMockWithGet as any);

    // act
    const userModel = new UserModel();
    const user = await userModel.createUser(userMockCreate as any);

    // assert
    const { password, ...userWithoutPassword } = userMockCreate;
    expect(user).to.eql(userWithoutPassword);
  });

  it('1.4 - should return null when there are no users', async () => {
    // arrange
    sinon.stub(SequelizeUser, 'findAll').returns(null as any);

    // act
    const userModel = new UserModel();
    const users = await userModel.getAllUsers();

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
    const user = await userModel.createUser(userMockCreate as any);

    // assert
    expect(user).to.eql(null);
  });
});