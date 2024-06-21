import { Sequelize } from 'sequelize';


const DATABASE_URL = 'mysql://ukxylexbc3xxmnyo:k2pCk8gWxKysZDrPwse9@bwoikuipd41rdgj4u4nd-mysql.services.clever-cloud.com:3306/bwoikuipd41rdgj4u4nd';

export const sequelize = new Sequelize(
  DATABASE_URL,
  {
    dialect: 'mysql',
    logging: false,
    protocol: 'mysql',
  }
);

const connectionDb = async () => {
  try {
    await sequelize.authenticate();
     console.log('Connection to the database has been established successfully.');

    await sequelize.sync({
      alter: false,
      force: false
    });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectionDb;
