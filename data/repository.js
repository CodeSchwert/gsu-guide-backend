const { connect, disconnect } = require('./database');
const availability = require('./repos/availability');

(async () => {
  if (process.env.NODE_ENV !== 'test') {
    await connect();
  }
})();

module.exports = {
  connect,
  disconnect,
  availability
};
