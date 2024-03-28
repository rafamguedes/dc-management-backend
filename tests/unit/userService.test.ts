import { expect } from 'chai';
import * as sinon from 'sinon';
import { UserModel } from '../../src/models/UserModel';
import { UserService } from '../../src/services/UserService';
import * as bcrypt from 'bcrypt';
import { userMock, userMockCreate, userMockUpdate, usersMock } from '../mocks/user.mock';

describe('Unit Tests UserService', () => {
  afterEach(() => {
   sinon.restore();
  });

  it('1.1 - should get all users', async () => {
    // Arrange
    sinon.stub(UserModel.prototype, 'getAllUsers').returns(usersMock as any);

    // Act
    const userService = new UserService(new UserModel());
    const users = await userService.getAllUsers();

    // Assert
    expect(users.data).to.eql(usersMock);
  });

  it('1.2 - should failed to get all users', async () => {
    // Arrange
    sinon.stub(UserModel.prototype, 'getAllUsers').returns(null as any);

    // Act
    const userService = new UserService(new UserModel());
    const users = await userService.getAllUsers();

    // Assert
    expect(users.status).to.eql('INTERNAL_ERROR');
    expect(users.data).to.eql({ message: 'Failed to fetch users' });
  });

  it('1.3 - should register a user', async () => {
    // Arrange
    sinon.stub(UserModel.prototype, 'getByEmail').returns(Promise.resolve(null));
    sinon.stub(UserModel.prototype, 'createUser').returns(userMockUpdate as any);
    sinon.stub(bcrypt, 'hashSync').returns('hashedpassword');

    // Act
    const userService = new UserService(new UserModel());
    const user = await userService.registerUser(userMockCreate as any);

    // Assert
    expect(user.data).to.eql(userMockUpdate);
  });

  it('1.4 - should not register a user with an existing email', async () => {
    // Arrange
    sinon.stub(UserModel.prototype, 'getByEmail').returns(userMock as any);

    // Act
    const userService = new UserService(new UserModel());
    const user = await userService.registerUser(userMockCreate as any);

    // Assert
    expect(user.status).to.eql('CONFLICT');
    expect(user.data).to.eql({ message: 'User already exists' });
  });

  it('1.5 - should failed to register a user', async () => {
    // Arrange
    sinon.stub(UserModel.prototype, 'getByEmail').returns(Promise.resolve(null));
    sinon.stub(UserModel.prototype, 'createUser').returns(null as any);

    // Act
    const userService = new UserService(new UserModel());
    const user = await userService.registerUser(userMockCreate as any);

    // Assert
    expect(user.status).to.eql('INTERNAL_ERROR');
    expect(user.data).to.eql({ message: 'Failed to register user' });
  });
});