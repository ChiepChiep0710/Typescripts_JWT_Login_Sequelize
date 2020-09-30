"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
const env = process.env.NODE_ENV || 'development';
const config = config_1.default[env];
const sequelize = new sequelize_typescript_1.Sequelize(config.url, config);
/*import modelDefinerss from '../users/users.model'
const modelDefiners: any = [modelDefinerss]
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}*/
sequelize.sync({ force: false }).then(() => {
    console.log(`Database & tables created!`);
});
module.exports = sequelize;
