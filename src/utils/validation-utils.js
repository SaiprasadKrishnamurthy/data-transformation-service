'use strict';

const Joi = require('@hapi/joi');

/**
 * Validation rules for a Mandatory query string with the name specified by a 'key'.
 * @param {key} key
 */
const mandatoryStrings = (keys) => {

    const rules = {};
    keys.forEach((key) => (rules[key] = Joi.string().required()));
    return Joi.object(rules);
};

/**
 * Checks if 'x-api-key' exists in the header.
 */
const mandatoryXApiToken =
    Joi.object({ 'x-api-key': Joi.string().required() });

module.exports = {
    mandatoryStrings,
    mandatoryXApiToken
};
