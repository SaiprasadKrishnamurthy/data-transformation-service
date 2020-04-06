'use strict';

// initialize the database.
require('./src/database/database').db;

const Server = require('./src/server/server');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 7777;

console.log(' Env vars: ' + JSON.stringify(process.env));
// Start the server with the host and port specified as passed-in arguments
module.exports = Server.start(host, port);
