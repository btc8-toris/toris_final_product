const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER || 'postgres',
      database: process.env.POSTGRES_DB,
      host: process.env.DATABASE_URL || 'localhost',
      port: process.env.PORT || 5432,
    },
    migrations: {
      directory: path.resolve(__dirname, './data/migration'),
    },
    seeds: { directory: path.resolve(__dirname, './data/seed') },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_URL,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: process.env.PORT || 5432,
      // SSL/TLS接続を有効にする (Auroraでは推奨または必須の場合が多い)
      // 環境変数で制御するか、必要に応じて 'require' に設定
      // ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
    },
    migrations: {
      directory: path.resolve(__dirname, './data/migration'),
    },
    seeds: { directory: path.resolve(__dirname, './data/seed') },
  },
};
