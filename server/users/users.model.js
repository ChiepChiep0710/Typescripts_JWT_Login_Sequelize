"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Database/database"));
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = {
    tableName: 'User',
    sequelize: database_1.default,
};
class User extends sequelize_1.Model {
    static findByCredentials(email, password) {
        throw new Error("Method not implemented.");
    }
}
exports.User = User;
User.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING
    }
}, config);
User.beforeCreate((user) => __awaiter(void 0, void 0, void 0, function* () {
    user.password = yield bcrypt.hash(user.password, 8);
}));
User.prototype.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // tao token dua tren id cua user
        const user = this;
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
        user.token = token;
        yield user.save();
        return token;
    });
};
User.findByCredentials = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // tim user dung
        try {
            const user = yield User.findOne({ where: { email: email } });
            if (!user) {
                throw new Error('user is not exist');
            }
            const isPasswordMatch = yield bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new Error('password is wrong');
            }
            return { user: user };
        }
        catch (error) {
            return { error: error };
        }
    });
};
User.sync({ force: false }).then(() => console.log("Node table created"));
