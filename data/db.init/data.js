db = db.getSiblingDB('gsu-db');
db.availabilities.insertMany([
  {
    title: 'Learn how to play Magic the Gathering',
    start: '2021-06-21T21:00:00.000Z',
    end: '2021-06-22T03:00:00.000Z',
    timezone: 'Pacific/Auckland'
  },
  {
    title: 'Learn how to play Pokemon TCG',
    start: '2021-06-22T23:30:00.000Z',
    end: '2021-06-23T07:30:00.000Z',
    timezone: 'Pacific/Auckland'
  },
  {
    title: 'Learn how to play Flesh and Blood',
    start: '2021-06-23T19:30:00.000Z',
    end: '2021-06-24T09:30:00.000Z',
    timezone: 'Pacific/Auckland'
  },
  {
    title: 'Learn how to play Magic the Gathering',
    start: '2021-06-28T21:00:00.000Z',
    end: '2021-06-29T03:00:00.000Z',
    timezone: 'Pacific/Auckland'
  },
  {
    title: 'Learn how to play Pokemon TCG',
    start: '2021-06-29T23:30:00.000Z',
    end: '2021-06-30T07:30:00.000Z',
    timezone: 'Pacific/Auckland'
  },
  {
    title: 'Learn how to play Flesh and Blood',
    start: '2021-06-30T19:30:00.000Z',
    end: '2021-07-01T09:30:00.000Z',
    timezone: 'Pacific/Auckland'
  },
  {
    title: '; DROP TABLE users; --',
    start: '2021-07-01T19:30:00.000Z',
    end: '2021-07-02T07:15:00.000Z',
    timezone: 'Pacific/Auckland'
  }
]);
