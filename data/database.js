const mongoose = require('mongoose');

const { MONGO_CONN } = process.env;

const mongoUri = MONGO_CONN;
const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connection.on('error', (e) => {
  if (e.message.code === 'ETIMEDOUT') {
    console.error('Connection timed out, retrying connection ...');
    mongoose.connect(mongoUri, mongoOpts);
  }
  console.error('Connection timed out!');
  console.error(e);
});

mongoose.connection.once('open', () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  }
});

const connect = async (uri, opts) => {
  await mongoose.connect(uri ? uri : mongoUri, opts ? opts : mongoOpts);
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  connect,
  disconnect
};
