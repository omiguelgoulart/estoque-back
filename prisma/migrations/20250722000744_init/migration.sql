-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('ADMIN', 'FUNCIONARIO');

-- CreateEnum
CREATE TYPE "Unidade" AS ENUM ('UNIDADE', 'LITRO', 'GRAMA');

-- CreateEnum
CREATE TYPE "TipoMovimentacao" AS ENUM ('ENTRADA', 'RETIRADA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade" "Unidade" NOT NULL,
    "estoqueAtual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entradas_estoque" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entradas_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retiradas_estoque" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "retiradas_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_movimentacao" (
    "id" TEXT NOT NULL,
    "tipo" "TipoMovimentacao" NOT NULL,
    "produtoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "entradas_estoque" ADD CONSTRAINT "entradas_estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entradas_estoque" ADD CONSTRAINT "entradas_estoque_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retiradas_estoque" ADD CONSTRAINT "retiradas_estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retiradas_estoque" ADD CONSTRAINT "retiradas_estoque_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_movimentacao" ADD CONSTRAINT "logs_movimentacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_movimentacao" ADD CONSTRAINT "logs_movimentacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
