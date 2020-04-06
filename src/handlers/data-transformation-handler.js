'use strict';

const ErrorHandlers = require('../utils/error-handlers');
const { TransformationRuleFinders } = require('../models/transformation-rule');
const Jsonata = require('jsonata');


/**
 * Transforms the data based on the defined rules.
 * @param {*} request
 * @param {*} reply
 */

const transform = async (request, h) => {

    try {
        const dataset = request.query.dataset;
        const transformationRules = await TransformationRuleFinders.findByRuleName(dataset);
        if (transformationRules) {
            const transformationRule = transformationRules[0];
            const ruleDefinition = transformationRule.ruleDefinition;
            const expression = Jsonata(ruleDefinition);
            const transformed = expression.evaluate(request.payload);
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
