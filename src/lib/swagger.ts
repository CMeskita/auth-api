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
            url: "https://auth-api-chi.vercel.app/",
            email: "support@example.com",
        }
      },
     paths:{ 
      
     '/api/login':{
      post:{
      summary:"Authenticar usuário",
      parameters:[],
      requestBody:{content:{Usuario:{"example":{"email":"danielle@gmail.com","senha":"1231456"},}}},
      responses:{200:{description:"success"},500:{description:"internal error"}},
     

      }
     }

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
                type: 'string',
                properties: 
                {
                  email:"string"
                  ,senha:"string"
                }
            },
            User: {
                type: 'string',
                properties: {}
            },
            Auth: {
                type: 'string',
                properties: {}
            },
        }
      },
      security: [],
      servers: [
        {
          url: "http://localhost:3000",
          description: "My API Documentation",
        },
      ],
    },
  });
  return spec;
};