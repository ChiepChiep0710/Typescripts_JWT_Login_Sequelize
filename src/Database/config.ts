import dotenv from 'dotenv';
dotenv.config();
interface environment {
  [key: string]: any;
}
const environments: environment = {
  development: {
    url: process.env.DEV_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_URL,
    dialect: 'postgres',
  },
};
export default environments;
