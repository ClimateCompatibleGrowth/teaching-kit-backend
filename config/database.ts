module.exports = ({ env }) =>
  env('NODE_ENV') === 'production'
    ? {
        connection: {
          client: 'postgres',
          connection: {
            host: env('DATABASE_HOST'),
            port: env.int('DATABASE_PORT'),
            database: env('DATABASE_NAME'),
            user: env('DATABASE_USERNAME'),
            password: env('DATABASE_PASSWORD'),
            ssl: {
              rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
            },
          },
          debug: false,
          acquireConnectionTimeout: 600000,
          pool: {
            min: 0,
            max: 100,
            acquireTimeoutMillis: 300000,
            createTimeoutMillis: 300000,
            destroyTimeoutMillis: 50000,
            idleTimeoutMillis: 300000,
            reapIntervalMillis: 10000,
            createRetryIntervalMillis: 2000,
            propagateCreateError: false,
          },
        },
      }
    : {
        connection: {
          client: 'postgres',
          connection: {
            host: env('DATABASE_HOST', '127.0.0.1'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', ''),
            password: env('DATABASE_PASSWORD', ''),
            ssl: env('DATABASE_SSL', false),
          },
          useNullAsDefault: true,
        },
      }
