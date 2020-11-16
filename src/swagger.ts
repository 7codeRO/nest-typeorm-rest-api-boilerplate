export const swaggerJson = {
  definition: {
    info: {
      description: '7code Nest Boilerplate API',
      version: '1.0.0',
      title: 'Swagger',
      contact: {
        email: 'office@7code.ro',
      },
    },
    securityDefinitions: {
      Bearer: {
        name: 'Authorization',
        in: 'header',
        type: 'apiKey',
      },
    },
    definitions: {
      ApiResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            format: 'int32',
          },
          type: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
    schemes: ['http'],
    basePath: '/api/v1',
  },

  // Path to the API docs
  apis: [process.cwd() + '/src/**/*.controller.ts'],
};
