'use strict';

/*
    An index of all the routes.
*/
const routes = [
    require('./auth-routes'),
    require('./data-transformation-routes')
];

module.exports = routes.flat();
