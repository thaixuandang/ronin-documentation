---
description: Run a Random Beacon Service.
title: Run a Random Beacon Service
---

## Overview

This guide demonstrates how to run a Random Beacon Service to [generate random beacon](https://github.com/ronin-chain/REPs/blob/main/REP-0010/REP-0010.md#compute-random-beacon). If you're an active Ronin Governing Validator, you need to run this service.

Governing Validators can choose to run the Random Beacon Service in standalone mode or combined mode. We suggest to use standalone mode to increase the security and stability of the system.

## Prerequisites

Before setting up the Random Beacon Service, we need to prepare:
- Go version 1.19 or higher
- Docker 
- Registered the [VRF key](../manage/vrf-key.mdx)
- A Ronin address to submit the random beacon. This can be any address (https://docs.roninchain.com/validators/setup/generate-keys#generate-an-ecdsa-key-using-the-cli ) but make sure to top up to this address some RON (you will need to send one transaction per day).

## Run Random Beacon Service in standalone mode

1. Setup directories and create a directory for postgres db data
```
mkdir -p ~/ronin-random-beacon/docker
cd ~/ronin-random-beacon
mkdir -p ~/ronin-random-beacon/db
```

2. In the docker directory, create a `docker-compose.yml` file with the following configuration:

```
version: '3.5'

services:
  ronin-random-beacon-chain:
    image: ${NODE_IMAGE}
    restart: always
    logging:
      options:
        max-size: 10m
        max-file: "3"
    environment:
      RONIN_RANDOM_BEACON_PARAMS: ${RONIN_RANDOM_BEACON_PARAMS}
      RONIN_PRIVATE_KEY: ${RONIN_PRIVATE_KEY}
      RONIN_SECRET_KEY: ${RONIN_SECRET_KEY}
      RONIN_RPC_ENDPOINT: ${RONIN_RPC_ENDPOINT}
      RONIN_VERBOSITY: ${RONIN_VERBOSITY}
      RONIN_DATABASE_URL: postgresql://${DB_USER}:${DB_PASS}@ronin-random-beacon-chain-db:5432/${DB_USER}?sslmode=disable
    depends_on:
      - ronin-random-beacon-chain-db
  ronin-random-beacon-chain-db:
    image: postgres:14
    restart: always
    ports:
      - "127.0.0.1:5433:5432"
    logging:
      options:
        max-size: 10m
        max-file: "3"
    volumes:
      - ~/ronin-random-beacon/db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 30s
      timeout: 30s
      retries: 3
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
```

This compose file defines the `ronin-random-beacon` service that pulls a Ronin random beacon image from the [GitHub Container Registry](https://github.com/ronin-chain/ronin-random-beacon/pkgs/container/ronin-random-beacon).

**Note.** In case you want to connect to node container in different docker-compose in the same machine, please check [here](https://docs.docker.com/compose/networking/#use-a-pre-existing-network) for reusing the existing network in the above setting for making a connection between random-beacon service with rpc node service. 

For example if the current docker network of node containers you wanna connect is `ronin_default` (You can check by running `docker network ls`). Then put this block in per service inside the above docker-compose to connect to the existing network.

```
...
ronin-random-beacon-chain:
  image: ${NODE_IMAGE}
  restart: always
  networks:
   - ronin_default
...
ronin-random-beacon-chain-db:
  image: postgres:14
  restart: always
  networks:
   - ronin_default
...
...

networks:
  ronin_default:
    external: true
```

3. In the docker directory, create an `.env` file and add the following content, replacing the `<...>` placeholder values with your information:

```
NODE_IMAGE=ghcr.io/ronin-chain/ronin-random-beacon:v0.0.1-2798dc6
DB_USER=ronin
DB_PASS=<DB_PASS>
# your ronin private key with the 0x prefix for submitting the transactions to chain.
RONIN_PRIVATE_KEY=<RONIN_PRIVATE_KEY> 
# Your VRF Secret key with the 0x prefix
RONIN_SECRET_KEY=<RONIN_SECRET_KEY>
RONIN_RANDOM_BEACON_PARAMS=--config-file /opt/config/mainnet/
RONIN_RPC_ENDPOINT=<YOUR_RPC_ENDPOINT>
RONIN_VERBOSITY=4
```

4. Start the node

```
cd ~/ronin-random-beacon && docker-compose up -d 
```

5. Review the log

```
docker logs ronin-random-beacon-chain  -f –tail 100
```

## Run Random Beacon Service in combined mode

1. Setup directory for postgres db data (assume that your node directory is as same as setting in [here](./mainnet/run-validator.mdx))

```
cd ~/ronin
mkdir -p ronin-random-beacon-db
```

2. In the docker directory, append the current docker-compose.yml file with the following configuration:

```
version: '3.5'

services:
  ...
  ...
  ronin-random-beacon-chain:
    image: ${RONIN_RANDOM_BEACON_CHAIN_IMAGE}
    restart: always
    logging:
      options:
        max-size: 10m
        max-file: "3"
    environment:
      RONIN_RANDOM_BEACON_PARAMS: ${RONIN_RANDOM_BEACON_PARAMS}
      RONIN_PRIVATE_KEY: ${RONIN_RANDOM_BEACON_CHAIN_PRIVATE_KEY}
      RONIN_SECRET_KEY: ${RONIN_RANDOM_BEACON_CHAIN_SECRET_KEY}
      RONIN_RPC_ENDPOINT: ${RONIN_RANDOM_BEACON_CHAIN_RPC_ENDPOINT}
      RONIN_VERBOSITY: ${RONIN_RANDOM_BEACON_CHAIN_VERBOSITY}
      RONIN_DATABASE_URL: postgresql://${RONIN_RANDOM_BEACON_DB_USER}:${RONIN_RANDOM_BEACON_DB_PASS}@ronin-random-beacon-chain-db:5432/${RONIN_RANDOM_BEACON_DB_USER}?sslmode=disable
    depends_on:
      - ronin-random-beacon-chain-db
  ronin-random-beacon-chain-db:
    image: postgres:14
    restart: always
    ports:
      - "127.0.0.1:5433:5432"
    logging:
      options:
        max-size: 10m
        max-file: "3"
    volumes:
      - ~/ronin/ronin-random-beacon-db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${RONIN_RANDOM_BEACON_DB_USER}"]
      interval: 30s
      timeout: 30s
      retries: 3
    environment:
      POSTGRES_USER: ${RONIN_RANDOM_BEACON_DB_USER}
      POSTGRES_PASSWORD: ${RONIN_RANDOM_BEACON_DB_PASS}
```

This compose file defines the `ronin-random-beacon` service that pulls a Ronin random beacon image from the [GitHub Container Registry](https://github.com/ronin-chain/ronin-random-beacon/pkgs/container/ronin-random-beacon).

3. In the docker directory, create an `.env` file and add the following content, replacing the `<...>` placeholder values with your information:

```
RONIN_RANDOM_BEACON_CHAIN_IMAGE=ghcr.io/ronin-chain/ronin-random-beacon:v0.0.1-2798dc6
RONIN_RANDOM_BEACON_DB_USER=ronin
RONIN_RANDOM_BEACON_DB_PASS=<RONIN_RANDOM_BEACON_DB_PASS>
# your ronin private key with the 0x prefix for submitting the transactions to chain.
RONIN_RANDOM_BEACON_CHAIN_PRIVATE_KEY=<RONIN_RANDOM_BEACON_CHAIN_PRIVATE_KEY> 
# Your VRF Secret key with the 0x prefix
RONIN_RANDOM_BEACON_CHAIN_SECRET_KEY=<RONIN_RANDOM_BEACON_CHAIN_SECRET_KEY>
RONIN_RANDOM_BEACON_PARAMS=--config-file /opt/config/mainnet/
RONIN_RANDOM_BEACON_CHAIN_RPC_ENDPOINT=http://node:8545
RONIN_RANDOM_BEACON_CHAIN_VERBOSITY=4

```

4. Start the node

```
cd ~/ronin && docker-compose up -d 
```

5. Review the log

```
docker logs ronin-random-beacon-chain  -f –tail 100
```
