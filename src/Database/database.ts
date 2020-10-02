import { Sequelize } from 'sequelize';
import envConfig from './config';
const env = process.env.NODE_ENV || 'development';
const config = envConfig[env];
const sequelize = new Sequelize(config.url, config);
export default sequelize;
