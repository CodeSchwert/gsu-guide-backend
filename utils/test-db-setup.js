require('dotenv').config({ path: '.env.test' });
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  try {
    const mongoOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    };

    const mongod = new MongoMemoryServer();
    const mongoUri = await mongod.getUri();

    return {
      mongod,
      mongoUri,
      mongoOpts
    };
  } catch (e) {
    console.error(e);
  }
};
