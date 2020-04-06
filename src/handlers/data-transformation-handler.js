'use strict';

const ErrorHandlers = require('../utils/error-handlers');
const { TransformationRuleFinders } = require('../models/transformation-rule');
const jsonTransform = require('json-to-json-transformer').transform;

const CustomDataTransformationFunctions = require('../utils/data-transformation-custom-functions');

/**
 * Transforms the data based on the defined rules.
 * @param {*} request
 * @param {*} reply
 */

const transform = async (request, h) => {

    try {
        const dataset = request.query.dataset;
        const enrichmentRules = await TransformationRuleFinders.findByRuleName(dataset);
        if (enrichmentRules) {
            const enrichmentRule = enrichmentRules[0];
            const ruleDefinition = enrichmentRule.ruleDefinition;
            const transformed = jsonTransform(ruleDefinition, request.payload, CustomDataTransformationFunctions);
            return h.response(transformed);
        }

        ErrorHandlers.handleNotFoundError(`Data Transformation Rule not defined: ${dataset}`, { message: `Data Transformation Rule not defined: ${dataset}` });
    }
    catch (error) {
        console.error(error);
        ErrorHandlers.handleServerError(error, {});
    }
};

module.exports = {
    transform
};
