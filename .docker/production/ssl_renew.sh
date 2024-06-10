#!/bin/bash

COMPOSE="docker compose"
DOCKER="docker"

cd /home/madman/node_project/
$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP webserver
$DOCKER system prune -af