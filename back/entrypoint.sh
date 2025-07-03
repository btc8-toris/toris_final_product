#!/bin/sh



echo "Running Knex migrations and seeds..."

npm run db:reset

if [ $? -ne 0 ]; then
  echo "Knex migrations/seeds failed. Exiting."
  exit 1
fi

echo "Knex migrations and seeds completed. Starting application..."

exec npm start
