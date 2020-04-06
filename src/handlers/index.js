'use strict';

const RequireDirectory = require('require-directory');

// Renames the handler files by removing the  '-handler' section in the file name.
module.exports = RequireDirectory(module, { rename: (name) => name.replace('-handler', '').replace('-', '') });
