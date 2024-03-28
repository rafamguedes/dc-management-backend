import * as chai from 'chai';
import { App } from '../../src/app';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Test Health Check of App', () => {

  const app = new App().app;

  it('1 - should checking health check of app', async () => {
    const { status, text } = await chai.request(app).get('/');
    chai.expect(status).to.be.equal(200);
    chai.expect(text).to.be.equal('Health Check OK!');
  });
});