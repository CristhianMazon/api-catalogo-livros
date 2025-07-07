// src/server.js
// Ponto de entrada da aplicação.
// Responsável por importar o app Express e iniciar o servidor.

const app = require('./app');

// Define a porta. Usa a variável de ambiente PORT ou 3333 como padrão.
const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`🚀 Servidor iniciado na porta ${port}!`);
  console.log(`📖 Documentação da API disponível em http://localhost:${port}/api-docs`);
});
