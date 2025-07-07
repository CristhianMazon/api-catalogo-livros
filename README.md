📚 API Catálogo de Livros — Trabalho Acadêmico
Este repositório contém o projeto final da disciplina de Desenvolvimento Backend, focado na criação de uma API RESTful segura, modular e bem estruturada, permitindo o gerenciamento completo de um catálogo de livros.

A aplicação é desenvolvida com Node.js e JavaScript, utilizando o Express como framework web e o Sequelize ORM para integração com banco de dados MySQL. A documentação da API é feita com Swagger.

📌 Objetivo
O objetivo deste projeto é aplicar conceitos fundamentais do backend moderno, com foco em:

🔐 Autenticação via JWT e proteção de rotas

📚 Gestão de entidades: Usuários, Gêneros, Livros e Listas de Leitura

🔄 Relacionamentos entre entidades (ex: livro → gênero, usuário → lista de leitura)

📘 Documentação completa da API com Swagger

📦 Código limpo, modular e com padrão MVC

🛠️ Tecnologias Utilizadas
Backend
Node.js → Ambiente JavaScript no servidor

Express.js → Framework para criação de APIs REST

MySQL → Banco de dados relacional

Sequelize → ORM para modelagem e operações no banco

JWT (jsonwebtoken) → Autenticação segura

bcryptjs → Criptografia de senhas

dotenv → Gerenciamento de variáveis de ambiente

Swagger → Documentação interativa da API

CORS → Liberação de acesso cross-origin para clientes

Nodemon → Reinício automático em ambiente de desenvolvimento

📁 Estrutura do Projeto
Plaintext

📦 api-catalogo-livros
├── 📁 config/         → Configuração do Sequelize (.sequelizerc, config.js)
├── 📁 migrations/     → Migrations da estrutura do banco
├── 📁 seeders/        → Dados iniciais para popular o banco
├── 📁 src/
│   ├── 📁 config/      → Configuração da autenticação (auth.js)
│   ├── 📁 controllers/  → Lógica dos endpoints (MVC)
│   ├── 📁 docs/         → Configuração do Swagger
│   ├── 📁 middlewares/  → Middleware de autenticação JWT
│   ├── 📁 models/       → Definição das entidades do Sequelize
│   └── 📁 routes/       → Definição das rotas da API
├── .env.example      → Exemplo de variáveis de ambiente
├── .gitignore        → Arquivos e pastas ignorados pelo Git
├── .sequelizerc      → Configuração dos caminhos do Sequelize-CLI
├── package.json      → Dependências e scripts do projeto
└── README.md
🚀 Como Executar o Projeto
✅ Pré-requisitos
Node.js (versão 14 ou superior)

MySQL Server (recomenda-se o uso do XAMPP, Docker ou o instalador oficial)

Um cliente de banco de dados como MySQL Workbench ou DBeaver (recomendado)

🧰 Instalação e Execução
Clone o projeto:

Bash

git clone https://github.com/CristhianMazon/api-catalogo-livros.git
cd api-catalogo-livros
Instale as dependências:

Bash

npm install
Configure o ambiente:

Copie o arquivo .env.example para um novo arquivo chamado .env.

Abra o .env e ajuste as variáveis do banco de dados (DB_USER, DB_PASSWORD, etc.) de acordo com a sua instalação do MySQL.

Exemplo de .env:

Snippet de código

# Porta em que a aplicação vai rodar
PORT=3333

# Configurações do Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_do_mysql_aqui
DB_NAME=catalogo_livros_db

# Segredo para a assinatura dos Tokens JWT
JWT_SECRET=minha-chave-secreta-super-segura-2025
Crie e popule o banco de dados:

Certifique-se de que seu servidor MySQL está rodando.

No seu cliente de banco de dados (ex: MySQL Workbench), crie um novo schema (banco de dados) com o nome que você definiu em DB_NAME.

No terminal, na pasta do projeto, execute os comandos do Sequelize para criar as tabelas e inserir os dados iniciais:

Bash

# Executa as migrations para criar as tabelas
npx sequelize-cli db:migrate

# Executa os seeders para popular o banco
npx sequelize-cli db:seed:all
Inicie o servidor:

Bash

npm run dev
A API estará disponível em http://localhost:3333 (ou a porta que você definiu).

📘 Documentação da API
Após iniciar o servidor, acesse a documentação interativa gerada com Swagger no seu navegador:

http://localhost:3333/api-docs

Lá, você poderá testar todos os endpoints de forma visual.

🔐 Autenticação
A API utiliza JWT. Para acessar as rotas protegidas (praticamente todas, exceto cadastro e login), você deve primeiro obter um token através do endpoint POST /users/sessions.

Depois, em todas as outras requisições, envie o token no cabeçalho Authorization:

Authorization: Bearer seu_token_jwt_aqui

📚 Endpoints Principais
Usuários (/users)
POST /users → Cadastro de um novo usuário.

POST /users/sessions → Login para obter um token JWT.

Livros (/books)
GET /books → Lista todos os livros.

POST /books → Cria um novo livro.

GET /books/{id} → Busca um livro específico pelo ID.

PUT /books/{id} → Atualiza os dados de um livro.

DELETE /books/{id} → Remove um livro.

Gêneros (/genres)
GET /genres → Lista todos os gêneros.

POST /genres → Cria um novo gênero.

DELETE /genres/{id} → Remove um gênero.

Lista de Leitura (/reading-lists)
GET /reading-lists → Mostra a lista de leitura do usuário autenticado.

POST /reading-lists/{book_id} → Adiciona um livro à lista de leitura.

DELETE /reading-lists/{book_id} → Remove um livro da lista de leitura.

👨‍💻 Autor
Cristhian Silveira Mazon

Email: cristhian.s.mazon@gmail.com

LinkedIn: https://www.linkedin.com/in/cristhian-mazon/

GitHub: https://github.com/CristhianMazon
