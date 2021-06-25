const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const version = require('./package.json').version;
const notFoundHandler = require('./middleware/404Handler');
const errorHandler = require('./middleware/errorHandler');
const { availability } = require('./data/repository');
const availabilityRouter = require('./routers/availability');

// constants
const PORT = process.env.SERVER_PORT || 5500;

// load OpenAPI docs
const openApiSpec = yaml.load(
  fs.readFileSync(path.join(__dirname, 'openapi.yaml'), { encoding: 'utf8' })
);

// server!
const server = express();

// middleware
server.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));
server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));

// server OpenAPI docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// server version / debug route
server.get('/', (_, res) => {
  return res.json({ service: 'teaching-availability', version });
});

// resource routers
server.use('/availability', availabilityRouter(availability));

// error handlers
server.use('*', notFoundHandler);
server.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`gsu-guide-backend server listening on port ${PORT}`);
  });
}

module.exports = server;
