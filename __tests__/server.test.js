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

  describe('Availability Resource', () => {
    it('should return an array of availability objects', async () => {
      const response = await request(server)
        .get(`/availability`)
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      response.body.map(event => {
        expect(event.hasOwnProperty('id')).toBe(true);
        expect(event.hasOwnProperty('title')).toBe(true);
        expect(event.hasOwnProperty('start')).toBe(true);
        expect(event.hasOwnProperty('end')).toBe(true);
        expect(event.hasOwnProperty('timezone')).toBe(true);
      });
    });
  });
});
