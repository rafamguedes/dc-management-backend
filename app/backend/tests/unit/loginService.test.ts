import { expect } from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../../src/models/UserModel';
import { LoginService } from '../../src/services/LoginService';
import { JwtService } from '../../src/utils/JwtService';
import { userMock } from '../mocks/user.mock';

describe('Unit Tests LoginService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('1.1 - should authenticate a user', async () => {
    // Arrange
    sinon.stub(UserModel.prototype, 'getByEmail').returns(userMock as any);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(JwtService, 'createToken').returns('token');

    // Act
    const loginService = new LoginService(new UserModel());
    const response = await loginService.authenticateUser({ email: 'test@test.com', password: 'password' });

    // Assert
    expect(response.status).to.eql('SUCCESSFUL');
    expect(response.data).to.eql({ token: 'token' });
  });

  it('1.2 - should token be null', async () => {
    // Arrange
    sinon.stub(UserModel.prototype, 'getByEmail').returns(userMock as any);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(JwtService, 'createToken').returns(null as any);

    // Act
    const loginService = new LoginService(new UserModel());
    const response = await loginService.authenticateUser({ email: 'rafael@email.com', password: '123456' });

    // Assert
    expect(response.status).to.eql('INTERNAL_ERROR');
    expect(response.data).to.eql({ message: 'Error creating token' });
  });

  it('1.3 - should not authenticate a user with invalid credentials', async () => {
    // Arrange
    sinon.stub(UserModel.prototype, 'getByEmail').returns(null as any);

    // Act
    const loginService = new LoginService(new UserModel());
    const response = await loginService.authenticateUser({ email: 'adasd.com', password: '1' });

    // Assert
    expect(response.status).to.eql('UNAUTHORIZED');
    expect(response.data).to.eql({ message: 'Invalid email or password' });
  });

  it('1.4 - should fetch user role', async () => {
    const userModelStub = sinon.stub(UserModel.prototype, 'getByEmail').returns(userMock as any);

    const loginService = new LoginService(new UserModel());
    const response = await loginService.fetchUserRole('test@test.com');

    expect(response.status).to.eql('SUCCESSFUL');
    expect(response.data).to.eql({ role: 'user' });
    userModelStub.restore();
  });

  it('1.5 - should not fetch user role with invalid credentials', async () => {
    sinon.stub(UserModel.prototype, 'getByEmail').returns(null as any);

    const loginService = new LoginService(new UserModel());
    const response = await loginService.fetchUserRole('rafael@email.com');

    expect(response.status).to.eql('UNAUTHORIZED');
    expect(response.data).to.eql({ message: 'Invalid email or password' });
  });
});