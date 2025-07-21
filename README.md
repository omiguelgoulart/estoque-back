# 🍽️ Backend - Controle de Estoque para Restaurante

Este é o backend da aplicação de controle de estoque para restaurante, desenvolvido com **Express**, **TypeScript** e **Prisma**.

---

## 🚀 Funcionalidades

- Registro de produtos com unidade personalizada (unidades, litros, gramas)
- Registro de entradas de estoque
- Registro de retiradas diárias com data e unidade
- Cálculo de consumo médio
- Previsão de duração do estoque
- Sugestão de pedido mensal
- Controle de usuários com cargos ("admin", "estoquista", etc.)
- Autenticação com JWT
- Log completo de movimentações

---

## 🧱 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [JWT](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📁 Estrutura de Pastas

backend/
├── prisma/ # Migrations e schema do Prisma
├── src/
│ ├── controllers/ # Lógica de requisição/resposta
│ │ ├── auth/
│ │ ├── estoque/
│ │ ├── produto/
│ │ └── usuario/
│ ├── routes/ # Endpoints organizados por tipo
│ │ ├── auth/
│ │ ├── estoque/
│ │ ├── produto/
│ │ └── usuario/
│ ├── middlewares/ # Autenticação, erros, etc.
│ ├── services/ # Regras de negócio
│ ├── utils/ # Funções auxiliares (ex: JWT)
│ └── index.ts # Inicialização da aplicação
├── .env
├── package.json
└── README.md


<!--
🛡️ Autenticação

Este projeto utiliza JWT (JSON Web Token) para autenticação de usuários. 
A geração e verificação dos tokens é realizada no arquivo `src/utils/token.ts`.
-->

## 📚 Dicionário Gitmoji – Emojis e Significados

| Emoji | Código | Significado |
|-------|--------|-------------|
| 🎉    | `:tada:` | Início do projeto |
| 📝    | `:memo:` | Escrita ou atualização de documentação (README.md, comentários, etc.) |
| ✨    | `:sparkles:` | Nova funcionalidade |
| 🐛    | `:bug:` | Correção de bug |
| ♻️    | `:recycle:` | Refatoração de código (sem alteração de comportamento) |
| 🔥    | `:fire:` | Remoção de código ou arquivos |
| 🚑️   | `:ambulance:` | Correção crítica / hotfix |
| 💄    | `:lipstick:` | Alterações de estilo (UI, CSS, layout, etc.) |
| 🎨    | `:art:` | Melhoria na estrutura/formatação do código |
| ✅    | `:white_check_mark:` | Adição de testes |
| 🧪    | `:test_tube:` | Escrita de testes |
| 🚀    | `:rocket:` | Preparação para deploy |
| 🔧    | `:wrench:` | Alterações de configuração (ex: .env, config.js) |
| 🔒    | `:lock:` | Correções de segurança / ajustes de permissões |
| 📦    | `:package:` | Alterações em dependências ou arquivos de build (package.json, etc.) |
| ⬆️    | `:arrow_up:` | Upgrade de dependência |
| ⬇️    | `:arrow_down:` | Downgrade de dependência |
| 👷    | `:construction_worker:` | Configuração de CI/CD |
| 🐳    | `:whale:` | Alterações relacionadas ao Docker |
| 🗃️    | `:card_file_box:` | Alterações em banco de dados ou migrations |
| 🏗️    | `:building_construction:` | Trabalhando na estrutura/projeto |
| 🚨    | `:rotating_light:` | Correções de linter ou avisos |
| 🧱    | `:bricks:` | Infraestrutura ou arquitetura base |
| 🧹    | `:broom:` | Limpeza de código ou arquivos |
| 📈    | `:chart_with_upwards_trend:` | Melhoria de performance ou métricas |
