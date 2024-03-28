import { expect } from 'chai';
import { StatusCode } from '../../src/utils/StatusCode';

describe('Unit Tests StatusCode', () => {
  it('1.1 - should return 200 for SUCCESSFUL', () => {
    expect(StatusCode('SUCCESSFUL')).to.equal(200);
  });

  it('1.2 - should return 201 for CREATED', () => {
    expect(StatusCode('CREATED')).to.equal(201);
  });

  it('1.3 - should return 400 for INVALID_DATA', () => {
    expect(StatusCode('INVALID_DATA')).to.equal(400);
  });

  it('1.4 - should return 401 for UNAUTHORIZED', () => {
    expect(StatusCode('UNAUTHORIZED')).to.equal(401);
  });

  it('1.5 - should return 404 for NOT_FOUND', () => {
    expect(StatusCode('NOT_FOUND')).to.equal(404);
  });

  it('1.6 - should return 409 for CONFLICT', () => {
    expect(StatusCode('CONFLICT')).to.equal(409);
  });

  it('1.7 - should return 422 for UNPROCESSABLE_ENTITY', () => {
    expect(StatusCode('UNPROCESSABLE_ENTITY')).to.equal(422);
  });

  it('1.8 - should return 500 for INTERNAL_ERROR', () => {
    expect(StatusCode('INTERNAL_ERROR')).to.equal(500);
  });

  it('1.9 - should return 500 for unknown status', () => {
    expect(StatusCode('UNKNOWN')).to.equal(500);
  });
});