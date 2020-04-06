'use strict';

const Jwt = require('jsonwebtoken');
const ErrorHandlers = require('../utils/error-handlers');

const JwtSecretKey = process.env.JWT_SECRET_KEY;


// The paths for which No API token is required.
const whitelistedPaths = ['/documentation', '/api/v1/auth', '/swagger'];

/**
 * Authenticates a user and returns a signed JWT.
 * @param {*} request
 * @param {*} h
 */
const authenticate = (request, h) => {
    // TODO check in MONGO DB and fetch the user object.
    const user = {
        userId: 'saikris', password: null,
        authorities: ['Permission1', 'Permission2'],
        tokenExpiryInSeconds: 86400
    };
    const token = Jwt.sign(user, JwtSecretKey, {
        expiresIn: user.tokenExpiryInSeconds
    });
    return h.response({ auth: true, token });
};

/**
 * Validates a JWT passed in the x-api-key
 * @param {*} request
 * @param {*} h
 */

const validateJwt = async (request, h) => {

    // No tokens required.
    if (whitelistedPaths.find((wp) => request.path.startsWith(wp))) {
        return h.continue;
    }

    // Perform token verification.
    const headers = request.raw.req.headers;
    const xApiKey = headers['x-api-key'];
    if (!xApiKey) {
        ErrorHandlers.handleAuthError('No API Key Provided in \'x-api-key\' request header!', {});
    }
    else {
        await Jwt.verify(xApiKey, JwtSecretKey, (err, decoded) => {

            if (err) {
                ErrorHandlers.handleAuthError('Invalid API Token ' + err, {});
            }

            // set the user id for further quick reference.
            headers['x-user-id'] = decoded.userId;
            console.log(JSON.stringify(decoded));
        });
        return h.continue;
    }

};

module.exports = {
    validateJwt,
    authenticate
};
