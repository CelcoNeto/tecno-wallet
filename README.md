# TECNO-WALLET

## Projeto implemetado com:

- Docker (docker-compose);
- Testes de integração
- Validações (yup)
- Autenticação de usuário (jwt)
- Logger (Youch)

# Observação

- Faltou implementar a rota de resumo, devido ao débito técnico e nível de conhecimento onde fui estudando e fazendo.

- Faltou implementar alguns testes de integração

# Get Started

- Crie um arquivo na raiz `.env` com as seguintes configurações:

`APP_URL=http://localhost:3333`

`NODE_ENV=development`

`APP_PORT=3333`

`DB_DIALECT=postgres`

`DB_HOST=localhost`

`DB_NAME=tecnowallet`

`DB_USER=userroot`

`DB_PASS=2y12ifbDibd5HTpPUhVYWT0uKogLA26CplJ4xYbv0nO3SW03M5Xkc5G`

- Entrar no diretório do projeto `tecno-wallet` e rodar o comando `yarn || npm install`.

- Execute o comando na raiz do projeto `yarn dev`.

- Abra uma nova aba de terminal execute o comando `docker-compose up`. obs: Deve conter o docker-compose instalado na máquina.

- Abra uma nova aba de terminal e execute o comando `yarn sequelize db:migrate` para criação das tabelas no banco de dados.

* Crie um usuário com os campos:
  `name: STRING`,
  `email: STRING`,
  `password: STRING`,
  `confirm_password: STRING`

  - Em seguida, faça o login de usuário com os campos :
    `email: STRING, password: STRING`. Irá gerar um token de auth.

  - Copie este token, cole em uma variavel de ambiente do `Insomnia/Postman` e use a authentication _Bearer_ e referencie o token.

* Dentro do diretório do projeto, abra o arquivo `swagger.conf.json` para a documentação da API.
