# JetRed Server

GraphQL API with MySQL backend.

## Local Environment

Execute once:

1. Start [Docker](https://www.docker.com/products/docker-desktop)
1. Run `docker build -t jetred/server .` to initialize MySQL
1. Run `docker create --name local_jetred_server -p 3306:3306 jetred/server`
1. Run `npm install`

Start app:

1. Run `npm run localStore`
1. Run `npm run watch`

## Production Environment

Setup a MySQL database named `grafluxe_jetred.airports` and execute the files
in `./setup/tables`. Then:

1. Run `npm run build`
1. Run `npm start`
