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