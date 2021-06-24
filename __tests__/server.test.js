require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const request = require('supertest');
const dbSetup = require('../utils/test-db-setup');
const mockData = require('../utils/mock-availability');
const Availability = require('../data/models/availabilitySchema');
const version = require('../package.json').version;
const server = require('../server');

// global mongodb server object
let mongoServer = null;

beforeAll(async () => {
  try {
    const { mongod, mongoUri, mongoOpts } = await dbSetup();
    mongoServer = mongod;

    await mongoose.connect(mongoUri, mongoOpts);
    await Availability.insertMany(mockData);
  } catch (e) {
    console.error(e);
  }
});

afterAll(async () => {
  try {
    await mongoServer.stop();
    await mongoose.connection.close();
  } catch (e) {
    console.error(e);
  }
});

beforeEach(async () => {
  try {
    await Availability.insertMany(mockData);
  } catch (e) {
    console.error(e);
  }
});

afterEach(async () => {
  try {
    await Availability.deleteMany({});
  } catch (e) {
    console.error(e);
  }
});

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
      expect(response.body.length).toEqual(mockData.length);
      
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
