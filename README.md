# CRUD/EXPRESS E PRISMA

## Instalando bibliotecas

Para poderes executar o projeto é necessário instalar as bibliotecas, use o comando a baixo para isto.

```bash
npm install
```

## Set Up no projeto

Apos instalar as bibliotecas é necessário setar algumas configurações, execute os comandos a baixo para tal.

```bash
npx prisma migrate deploy
npx prisma generate
```

## Executando o projecto

Apos ter passado por todo o processo a cima, basta rodar os baixo para executar o app

Para ambiente de desenvolvimento
```bash
npm run dev
```

Para ambiente de produção
```bash
npm run start
```

## Executar test

Para rodar os testes basta executar

```bash
npm run test
```

## Endpoint's

Veja a baixo a lista de todos os endpoint's do projeto

METODO `endpoint`: (`corpo da requisição`) => `corpo da resposta`<br>

POST `/api/enterprise`: (`{name: string}`) => `void`<br>
GET `/api/enterprise/:id`: (`void`) => `{name: string, id: int}`<br> 
GET `/api/enterprise`: (`void`) => `{id: int, name: string}[]`<br>
DELETE `/api/enterprise/:id`: (`void`) => `void`<br>
PUT `/api/enterprise/:id`: (`{name: string}`) => `void`<br>

POST `/api/product`: (`{name: string, price: int, enterpriseId: int}`) => `void`<br>
GET `/api/product/:id`: (`void`) => `{id: int, name: string, price: int, enterpriseId: int}`<br> 
GET `/api/product`: (`void`) => `{id: int, name: string, price: int, enterpriseId: int}[]`<br>
DELETE `/api/product/:id`: (`void`) => `void`<br>
PUT `/api/product/:id`: (`{name: string, price: int, enterpriseId: int}`) => `void`<br>
GET `/api/product/from_enterprise/:enterprise_id`: (`void`) => `void`<br>

<b>Obs:</b>
Use o header `Content-Type: application/json` em todas as requisições com dados no corpo