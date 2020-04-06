'use strict';

const InertPlugin = require('@hapi/inert');
const VisionPlugin = require('@hapi/vision');
const SwaggerPlugin = require('hapi-swagger');
const PackageJson = require('../../package');

const swaggerOptions = {
    schemes: ['http', 'https'],
    cors: true,
    info: {
        title: 'StudentPodium ReferenceData API',
        version: PackageJson.version,
        description: 'REST APIs for the reference data of StudentPodium',
        contact: {
            name: 'Sai Kris',
            email: 'saiprasad.k@studentpodium.com',
            url: 'https://www.studentpodium.com'
        },
        license: {
            name: 'Proprietary Licence',
            url: 'https://www.studentpodium.com'
        }
    },
    securityDefinitions: {
        'API Key': {
            'type': 'apiKey',
            'name': 'x-api-key',
            'in': 'header'
        }
    }
};

module.exports = [
    {
        plugin: require('hapi-cors'),
        options: {
            origins: ['*']
        }
    },
    {
        plugin: InertPlugin
    },
    {
        plugin: VisionPlugin
    },
    {
        plugin: SwaggerPlugin,
        options: swaggerOptions
    }
];
