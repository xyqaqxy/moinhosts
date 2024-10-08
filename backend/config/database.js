module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'ep-spring-star-a13b0nrk.ap-southeast-1.aws.neon.tech'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'cloud_management'),
      user: env('DATABASE_USERNAME', 'cloud_management_owner'),
      password: env('DATABASE_PASSWORD', 'Wqnfmy7QCA1P'),
      ssl: env.bool('DATABASE_SSL', true) ? {
        rejectUnauthorized: false
      } : false,
    },
    debug: false,
  },
});