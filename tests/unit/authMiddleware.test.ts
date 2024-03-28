import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { Authenticate } from '../../src/middlewares/AuthMiddleware';
import { JwtService } from '../../src/utils/JwtService';

describe('Unit Tests Authenticate', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: sinon.SinonStub;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer token',
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      locals: {},
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('1.1 - should return 401 if no authorization header', async () => {
    // Arrange
    delete req.headers?.authorization;
    
    // Act
    Authenticate.authToken(req as Request, res as Response, next);
    
    // Assert
    sinon.assert.calledWith(res.status as sinon.SinonStub, 401);
    sinon.assert.calledWith(res.json as sinon.SinonStub, { message: 'Token not found' });
  });

  it('1.2 - should return 401 if token is invalid', async () => {
    sinon.stub(JwtService, 'splitToken').throws();
  });

  it('1.3 - should error validate token', async () => {
    // Arrange
    sinon.stub(JwtService, 'verifyToken').throws();
    
    // Act
    Authenticate.authToken(req as Request, res as Response, next);
    
    // Assert
    sinon.assert.calledWith(res.status as sinon.SinonStub, 401);
    sinon.assert.calledWith(res.json as sinon.SinonStub, { message: 'Token must be a valid token' });
  });
});