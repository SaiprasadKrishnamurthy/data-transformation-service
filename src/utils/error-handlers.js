'use strict';

// A nice library for creating Http friendly error objects.
const Boom = require('boom');

// Payload validation error handling.
const handlePayloadValidationError = (_, h, error) => {

    return error.isJoi ? h.response(error.details[0]).code(400).takeover() : h.response(error).takeover();
};

// Query String validation error handling.
const handleQueryStringValidationError = (_, h, error) => {

    return error.isJoi ? h.response(error.details[0]).code(400).takeover() : h.response(error).takeover();
};

// Not found error.
const handleNotFoundError = (message, data) => {

    throw Boom.notFound(data);

};

// Server error.
const handleServerError = (message, data) => {

    throw Boom.internal('Server Error')
        .message(message)
        .data(data);
};


// Auth error.
const handleAuthError = (message, data) => {

    throw Boom.unauthorized(message);
};

module.exports = {
    handlePayloadValidationError,
    handleQueryStringValidationError,
    handleNotFoundError,
    handleServerError,
    handleAuthError
};

