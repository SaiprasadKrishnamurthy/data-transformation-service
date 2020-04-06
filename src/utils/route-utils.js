'use strict';

const routeResponseDescriptions = (additionalDescriptions = []) => {

    const responses = {
        '400': {
            'description': 'BadRequest'
        },
        '401': {
            'description': 'Unauthorised'
        },
        '404': {
            'description': 'Not Found'
        },
        '500': {
            'description': 'Internal Server Error'
        }
    };
    // Add/Override the additional descriptions passed in.
    additionalDescriptions.forEach((desc) => {

        for (const k in desc) {
            responses[k] = {
                description: desc[k]
            };
        }
    });
    return {
        'hapi-swagger': {
            responses
        }
    };
};

module.exports = {
    routeResponseDescriptions
};
