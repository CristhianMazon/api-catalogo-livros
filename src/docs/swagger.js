const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Catálogo de Livros',
      version: '1.0.0',
      description: 'Uma API para gerenciar um catálogo de livros, com autenticação de usuários e lista de leitura pessoal.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de Desenvolvimento'
      },
    ],
    // Adiciona a configuração de segurança para o JWT
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Caminho para os arquivos que contêm as anotações da API
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;