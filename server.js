const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const version = require('./package.json').version;

// constants
const PORT = process.env.SERVER_PORT || 5500;

// server!
const server = express();

// middleware
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));

// server version / debug route
server.get('/', (_, res) => {
  return res.json({ service: 'teaching-availability', version });
});

// error handlers
server.use('*', notFoundHandler);
server.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`gsu-guide-backend server listening on port ${PORT}`);
  });
}

module.exports = server;
