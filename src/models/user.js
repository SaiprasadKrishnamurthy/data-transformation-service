'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = Mongoose.Schema;

// Schema definition for person.
const UserSchema = new Schema({
    userId: String,
    password: String,
    authorities: [String]
});

// Model definition.
const User = Mongoose.model('users', UserSchema);

// Validation Rules for User.
const UserValidationRules = Joi.object({
    userId: Joi.string().min(3).max(140).required(),
    password: Joi.string().min(6).max(140).required()
}).label('User');

// Finders. TODO

module.exports = {
    User,
    UserValidationRules
};
