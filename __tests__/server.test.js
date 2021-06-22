require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const version = require('../package.json').version;
const server = require('../server');

describe('Backend Server', () => {
  it('should return the server version', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.body.version).toEqual(version);
  });
});
