import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api', // define api folder under app folder
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next API Authentication',
        description:'Api de Autenticação token e Refrestoken',
        version: '1.0',
        contact:{
            name: "API Support",
            url: "http://www.exmaple.com/support",
            email: "support@example.com",
        }
      },
     paths:{
     
        login:{post:{'api/login':[Object]}},
        user:{get:{'api/user':[Object]}},
       //user:{post:{'api/user':[Object]}},
       // userget:{get:{'api/user':[Object]}},
        auth:{post:{'api/auth':[Object]}}
        
     },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        
        schemas: {
            Login: {
                type: 'object',
                properties: {}
            },
            User: {
                type: 'object',
                properties: {}
            },
            Auth: {
                type: 'object',
                properties: {}
            },
        }
      },
      security: [],
      servers: [
        {
          url: "http://localhost:4001",
          description: "My API Documentation",
        },
      ],
    },
  });
  return spec;
};