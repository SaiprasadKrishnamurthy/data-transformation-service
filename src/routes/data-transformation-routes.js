'use strict';

const Handlers = require('../handlers');
const TransformationRuleModel = require('../models/transformation-rule');
const ValidationUtils = require('../utils/validation-utils');
const RouteUtils = require('../utils/route-utils');

/**
 * List of Data Transformation Routes
 */
const dataTransformerRoutes = [
    {
        method: 'POST',
        path: '/api/v1/transform',
        options: {
            validate: {
                headers: ValidationUtils.mandatoryXApiToken,
                query: ValidationUtils.mandatoryStrings(['dataset']),
                payload: TransformationRuleModel.InputDocumentValidationRules,
                options: {
                    allowUnknown: true
                }
            },
            handler: Handlers.datatransformation.transform,
            description: 'This endpoint will transform the data passed in based on the rules defined.',
            notes: 'This endpoint will transform the data passed in based on the rules defined.',
            tags: ['api', 'transformation'],
            plugins: RouteUtils.routeResponseDescriptions() // Response descriptions for Swagger
        }
    }];
module.exports = dataTransformerRoutes;

