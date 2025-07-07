// src/app.js
// Arquivo de configuração do Express.

require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');
const routes = require('./routes');

// Importa a conexão com o banco de dados
require('./database');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Habilita o uso de JSON nas requisições
    this.server.use(express.json());
    // Rota para a documentação do Swagger
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  routes() {
    // Usa o arquivo principal de rotas
    this.server.use(routes);
  }
}

module.exports = new App().server;
