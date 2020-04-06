'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = Mongoose.Schema;

// Schema definition for TransformationRule.
const TransformationRuleSchema = new Schema({
    ruleName: String,
    ruleDefinition: Schema.Types.Mixed
});

// Model definition.
const TransformationRule = Mongoose.model('transformationrules', TransformationRuleSchema);

// Validation Rules for TransformationRule.
const TransformationRuleValidationRules = Joi.object({
    ruleName: Joi.string().min(2).max(140).required(),
    ruleDefinition: Joi.any().required()
}).label('TransformationRule');

// Validation Rules for InputDocument.
const InputDocumentValidationRules = Joi.allow().label('InputDocumentValidation');

// Finders.
const TransformationRuleFinders = {
    findByRuleName: async (name) => {

        return await TransformationRule.find({ ruleName: name });
    }
};

module.exports = {
    TransformationRule,
    TransformationRuleValidationRules,
    TransformationRuleFinders,
    InputDocumentValidationRules
};
