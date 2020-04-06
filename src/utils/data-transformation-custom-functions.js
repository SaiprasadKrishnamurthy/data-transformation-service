'use strict';

// Mask the inputs with '*'.
const mask = (input) => input.split('').map(() => '*').join('');

// Concatenate the values with '__' as a delimiter
const concat = (a, b, ...c) => a + '__' + b + '__' + c.join('__');

module.exports = {
    mask,
    concat
};

