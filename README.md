# 📦 DC Management Backend

> **Sistema de Gerenciamento de Centro de Distribuição** - Uma API REST robusta para gestão completa de operações de armazém com autenticação, controle de inventário e integração com QR codes.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-blue.svg)](https://www.postgresql.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## 🚀 Sobre o Projeto

O **DC Management Backend** é uma API REST completa desenvolvida para gerenciar operações de centros de distribuição e armazéns. O sistema oferece controle total sobre inventário, usuários, localização de produtos e rastreamento através de QR codes.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação JWT** - Sistema seguro de login e autorização
- 👥 **Gestão de Usuários** - Controle de acesso com diferentes níveis de permissão
- 🏢 **Organização Hierárquica** - Setores → Corredores → Slots → Pallets
- 📦 **Controle de Inventário** - Gestão completa de produtos e pallets
- 📱 **QR Code Integration** - Rastreamento e identificação através de QR codes
- 📊 **API Documentation** - Documentação interativa com Swagger/Scalar
- 🔄 **Health Monitoring** - Endpoints para monitoramento da aplicação
- 🛡️ **Validação Robusta** - Validação de dados com Joi
- 🗄️ **Database Migrations** - Controle de versão do banco de dados

## 🏗️ Arquitetura

```
📁 api/
├── 📁 src/
│   ├── 📁 config/           # Configurações (Swagger, etc.)
│   ├── 📁 controllers/      # Controladores da API
│   ├── 📁 database/         # Migrations, Models, Seeders
│   ├── 📁 interfaces/       # Definições TypeScript
│   ├── 📁 middlewares/      # Middlewares (Auth, CORS, Validação)
│   ├── 📁 routes/           # Definição das rotas
│   ├── 📁 services/         # Lógica de negócio
│   ├── 📁 utils/            # Utilitários
│   ├── 📄 app.ts           # Configuração do Express
│   └── 📄 server.ts        # Entrada da aplicação
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 .sequelizerc
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem tipada
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional

### Autenticação & Segurança
- **JWT** - JSON Web Tokens
- **Bcrypt** - Hash de senhas
- **Joi** - Validação de schemas

### Documentação & Monitoramento
- **Swagger/OpenAPI** - Documentação da API
- **Scalar** - Interface moderna para documentação

### DevOps & Deployment
- **Docker** - Containerização
- **Railway** - Deployment em nuvem

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL >= 14.0
- Git

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/rafamguedes/dc-management-backend.git
cd dc-management-backend/api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta `api/`:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dc_management_db
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=dc_management_db
PGHOST=localhost
PGPORT=5432

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Server
PORT=3001
NODE_ENV=development
```

### 4. Configure o banco de dados
```bash
# Criar banco de dados
npm run db:create

# Executar migrations
npm run db:migrate

# Popular com dados iniciais
npm run db:seed
```

### 5. Execute o projeto
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📚 Endpoints da API

### 🔐 Autenticação
```
POST /auth/login - Login de usuário
```

### 👥 Usuários
```
GET    /users     - Listar usuários
GET    /users/:id - Buscar usuário por ID
POST   /users     - Criar usuário
PUT    /users/:id - Atualizar usuário
DELETE /users/:id - Deletar usuário
```

### 🏢 Setores
```
GET    /sectors     - Listar setores
GET    /sectors/:id - Buscar setor por ID
POST   /sectors     - Criar setor
PUT    /sectors/:id - Atualizar setor
DELETE /sectors/:id - Deletar setor
```

### 🛤️ Corredores
```
GET    /aisles              - Listar corredores
GET    /aisles/:id          - Buscar corredor por ID
GET    /aisles/sector/:id   - Buscar corredores por setor
POST   /aisles              - Criar corredor
PUT    /aisles/:id          - Atualizar corredor
DELETE /aisles/:id          - Deletar corredor
```

### 📍 Slots
```
GET    /slots                - Listar slots
GET    /slots/:id           - Buscar slot por ID
GET    /slots/aisle/:id     - Buscar slots por corredor
GET    /slots/status/:status - Buscar slots por status
POST   /slots               - Criar slot
PUT    /slots/:id           - Atualizar slot
DELETE /slots/:id           - Deletar slot
```

### 📦 Produtos
```
GET    /products         - Listar produtos
GET    /products/:id     - Buscar produto por ID
GET    /products/code/:code - Buscar produto por código
POST   /products         - Criar produto
PUT    /products/:id     - Atualizar produto
DELETE /products/:id     - Deletar produto
```

### 🎯 Pallets
```
GET    /pallets              - Listar pallets
GET    /pallets/:id          - Buscar pallet por ID
GET    /pallets/qr/:qrCode   - Buscar pallet por QR code
GET    /pallets/unassigned   - Listar pallets não atribuídos
POST   /pallets              - Criar pallet
PUT    /pallets/:id          - Atualizar pallet
PATCH  /pallets/:id/assign   - Atribuir pallet a slot
PATCH  /pallets/:id/unassign - Desatribuir pallet
DELETE /pallets/:id          - Deletar pallet
```

### 📊 Monitoramento
```
GET /health - Status da aplicação e banco de dados
GET /docs/swagger - Documentação interativa
```

## 🐳 Docker

### Desenvolvimento com Docker Compose
```bash
# Subir todos os serviços
docker-compose up -d

# Logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### Build da imagem
```bash
docker build -t dc-management-backend .
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Linting
npm run lint
```

## 📈 Performance & Monitoramento

### Health Check
O endpoint `/health` fornece informações sobre:
- Status da aplicação
- Conexão com banco de dados
- Tempo de atividade (uptime)
- Uso de memória
- Timestamp da verificação

### Métricas de Performance
- Pool de conexões configurado para otimização
- Retry automático em falhas de conexão
- Timeouts configurados adequadamente
- Logs estruturados para debugging

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript para type safety
- Siga os padrões ESLint configurados
- Escreva testes para novas funcionalidades
- Documente endpoints no Swagger

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Rafael Magalhães Guedes**
- GitHub: [@rafamguedes](https://github.com/rafamguedes)
