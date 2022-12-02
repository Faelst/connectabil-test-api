# Connectabil API Test

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Heroku Api Endpoint

```
https://connectabil-test-api.herokuapp.com/
```

## Introdução

API desenvolvida para o teste da Connectabil, com **CI/CD** utilizando o Github actions e deploy no Heroku + Docker.

No diretório do projeto:

```
.github/workflows/deploy.yml
```

voce encontra os arquivos de configuração do Github Actions.
Todo momento que um commit é feito na branch **master** o Github Actions executa o pipeline de deploy no Heroku em um container Docker.

<hr>

## Tecnologias

- NestJS
- Typescript
- MongoDB
- Docker
- Mongoose
- Swagger
- Jest
- Github Actions
- Heroku

<hr>

## Metodologias e Designs

- Clean Architecture
- SOLID
- TDD
- DDD
- GitFlow
- Modular Design
- Dependency Diagrams
- Use Cases
- Continuous Integration
- Continuous Delivery
- Continuous Deployment

## Setup local

Para poder rodar o projeto localmente, é necessário ter o **Docker** e o **Docker Compose** instalados, para que possa subir os serviços necessários.

```bash
$ npm install
$ docker-compose up -d
```

Apos instalar as dependencias e subir os serviços, é necessário criar um arquivo **local.env** na raiz do projeto, com as seguintes variaveis:

```bash
$ touch env/local.env && echo "MONGO_URI=mongodb://localhost:27017/connectabil" >> env/local.env

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
