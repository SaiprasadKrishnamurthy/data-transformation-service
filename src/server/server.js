
'use strict';

const Hapi = require('@hapi/hapi');
const Plugins = require('../modules/plugins');
const Routes = require('../routes/index');
const AuthHandler = require('../handlers/auth-handler');

// initialize the server.
const start = async (host, port) => {
    // Create the server
    const server = new Hapi.server({ host, port });

    // Register plugins.
    await server.register(Plugins);

    // Initialize routes
    server.route(Routes);

    // Start accepting requests
    try {
        await server.start();
        console.log('Server running on %s', server.info.uri);

        // Configure Authorization.
        server.ext('onRequest', AuthHandler.validateJwt);

        // Global uncaughtRejection Handler
        process.on('unhandledRejection', (error) => {

            console.error((new Date()).toUTCString() + ' unhandledRejection:', error.message);
            console.error(error.stack);
        });
        // Global uncaughtException Handler
        process.on('uncaughtException', (err) => {

            console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
            console.error(err.stack);
            // add a mail logger or logging mechanism to do
            process.exit(1);
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = {
    start
};
