'use strict';

const Handlers = require('../handlers');
const UserModel = require('../models/user');
const ErrorHandlers = require('../utils/error-handlers');
const RouteUtils = require('../utils/route-utils');


const authRoutes = [
    {
        method: 'POST',
        path: '/api/v1/auth',
        options: {
            validate: {
                payload: UserModel.UserValidationRules,
                failAction: ErrorHandlers.handlePayloadValidationError
            },
            handler: Handlers.auth.authenticate,
            description: 'This endpoint will authenticate the user and issue a valid API token upon successful authentication.',
            notes: 'This endpoint will authenticate the user and issue a valid API token upon successful authentication.',
            tags: ['api', 'auth'],
            plugins: RouteUtils.routeResponseDescriptions() // Response descriptions for Swagger
        }
    }
];
module.exports = authRoutes;
