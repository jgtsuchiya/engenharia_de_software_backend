#!/bin/sh
# entrypoint.sh
set -e

echo "Aguardando MySQL em $DB_HOST:$DB_PORT..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 2
done

echo "MySQL está pronto!"

# Executa migrações (se quiser rodar automaticamente)
echo "Rodando migrações..."
node dist/database/knex.js migrate:latest

# Inicia a aplicação
echo "Iniciando server..."
exec node dist/control/server.js
