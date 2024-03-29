import { expect } from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '../../src/utils/JwtService';

describe('Unit Tests JwtService', () => {
  const payload = { id: '1' };

  afterEach(() => {
    sinon.restore();
  });

  it('1.1 - should create a token', () => {
    // arrange
    sinon.stub(jwt, 'sign').returns('token' as any);
    
    // act
    const token = JwtService.createToken(payload);

    // assert
    expect(token).to.be.a('string');
  });

  it('1.2 - should verify a token', () => {
    // arrange
    const token = JwtService.createToken(payload);
    sinon.stub(jwt, 'verify').returns(payload as any);
    
    // act
    const decodedPayload = JwtService.verifyToken(token);

    // assert
    expect(decodedPayload).to.eql(payload);
  });

  it('1.3 - should split a token', () => {
    // act
    const token = 'Bearer token';
    const splitToken = JwtService.splitToken(token);

    // assert
    expect(splitToken).to.equal('token');
  });
});