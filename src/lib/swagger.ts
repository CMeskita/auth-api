import { createSwaggerSpec } from 'next-swagger-doc';
import { describe } from 'node:test';
import { debugPort } from 'process';

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
            email: "developer.csharp.js@gmail.com",
        }
      },
     paths:{          
     '/api/login':{  
           
          post:{ 
          tags:["login"],                    
          summary:"Authenticar usuário",
          parameters:[],
          requestBody:{content:{Usuario:{"example":{"email":"luzia@Empresainicial.com","senha":"1234"},}}},
          responses:{200:{description:"success"},500:{description:"internal error"}},           
          }},
  
      '/api/user':{
           
            post:{
              tags:["user"], 
              summary:"Registrar usuário",
              
            },
            get:{
              tags:["user"],
              summary:"Listar usuário",
              responses:{200:{description:"success"}}
              
            },
           
            put:{
              tags:["user"],
              summary:"Alterar usuário",

            }
          },
          '/api/user/id':{
            get:{
              tags:["user"],
              summary:"Listar usuário por identifcador único",
            },
          }
           ,
          '/api/auth':{
         
            post:{
              tags:["auth"], 
              summary:"Atualizar Token",
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
          url: "http://localhost:3000/",
          description: "API Documentation",
        },
      ],
    },
  });
  return spec;
};