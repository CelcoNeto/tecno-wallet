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

- Entrar no diretório do projeto `tecno-wallet` e rodar o comando `yarn || npm install`. Após o download das dependências, execute o comando `yarn dev`.

- Abra uma nova aba de terminal execute o comando `docker-compose up`. obs: Deve conter o docker-compose instalado na máquina.

- Abra uma nova aba de terminal e execute o comando `yarn sequelize db:migrate` para criação das tabelas no banco de dados.

- Crie um arquivo na raiz `.env` com as seguintes configurações:

`APP_URL=http://localhost:3333`

`NODE_ENV=development`

`APP_PORT=3333`

`DB_DIALECT=postgres`

`DB_HOST=localhost`

`DB_NAME=tecnowallet`

`DB_USER=userroot`

`DB_PASS=2y12ifbDibd5HTpPUhVYWT0uKogLA26CplJ4xYbv0nO3SW03M5Xkc5G`

- Crie um usuário com os campos:
  `name: STRING`,
  `email: STRING`,
  `password: VIRTUAL`

  - Em seguida autentique o usuário com os campos :
    `name: STRING, password: STRING`

- Dentro do diretório do projeto, abra o arquivo `swagger.conf.json` para a documentação da API.
