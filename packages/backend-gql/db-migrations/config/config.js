// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
require('dotenv').config();

// eslint-disable-next-line no-undef
module.exports = {
  development: {
    use_env_variable: 'APP_DB_URI',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'APP_DB_URI',
    dialect: 'postgres',
  },
};
