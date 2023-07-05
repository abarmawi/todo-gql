import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

export const connectToDb = async () => {
  if (sequelize) {
    return Promise.resolve(sequelize);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const _sequelize = new Sequelize(process.env.APP_DB_URI!, {
    dialect: 'postgres',
  });

  await _sequelize.authenticate();
  sequelize = _sequelize;

  return sequelize;
};

export const getDb = () => {
  if (sequelize) {
    return sequelize;
  }

  throw new Error('Db is not initialized yet. call connectToDb first');
};
