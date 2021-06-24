# GetSetUp Guide Backend

API to for the Guide teaching availability frontend.

- [GetSetUp Guide Backend](#getsetup-guide-backend)
  - [Quick Start](#quick-start)
    - [Quick Stop](#quick-stop)
  - [API](#api)
  - [Getting Started Manually](#getting-started-manually)
    - [MongoDB Setup](#mongodb-setup)
    - [Server Setup](#server-setup)

## Quick Start

The easiest and quickest way to get the server and database started is by using `docker-compose`.

```zsh
# change directory into the project root
docker-compose up -d --build
```

If you prefer to start the server and database manually without `docker-compose` see the [Getting Started Manually](#getting-started-manually) section.

Once `docker-compose` has started the database and server, the server should be ready to accept requests on http://localhost:5000 and the mongo instance on localhost:27017 (with your favourite mongodb client).

### Quick Stop

To cleanup the `docker-compose` stack (also removes database volumes):

```zsh
docker-compose down -v
```

## API

- TBA

## Getting Started Manually

Instructions for setting up the server and database without using `docker-compose`. You only need to do this if you didn't star the server with the [Quick Start](#quick-start) instructions!

### MongoDB Setup

Use docker to get a local MongoDB instance running:

```zsh
# make sure to run this command in the root of the project folder!!!
docker run -d \
  -p 27017:27017 \
  -v "$(pwd)/data/db.init:/docker-entrypoint-initdb.d" \
  -v gsu-db:/data/db \
  --name gsu-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=getadminup \
  -e MONGO_INITDB_ROOT_PASSWORD=Supercalifragilisticexpialidoci0us \
  -e MONGO_INITDB_DATABASE=gsu-db \
  mongo
```

### Server Setup

Once the database is running, make a copy of the `.env.example` config file and rename the copy `.env`. Then update the `MONGO_CONN` variable in `.env` with the correct parameters (check the `docker` run command above for the correct credentials).

Then install the project dependencies:

```zsh
yarn install
```

Test the server (there are currently very few tests):

```zsh
yarn test
```

Finally, start the server (in dev mode):

```zsh
yarn start:dev
```

The server should be ready to accept requests on http://localhost:5000
