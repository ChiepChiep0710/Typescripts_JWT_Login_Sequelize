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
const users_model_1 = require("./users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_1 = __importDefault(require("../ultils/email"));
const postUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.User.create(body);
        return { user: user, status: 201 };
    }
    catch (error) {
        return { error: error.message, status: 400 };
    }
});
const userLogin = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = body;
        const { user: user, error: error } = yield users_model_1.User.findByCredentials(email, password);
        if (error) {
            throw new Error(error);
        }
        const token = yield user.generateAuthToken();
        return { status: 201, user: user, token: token };
    }
    catch (error) {
        return { error: error.message, status: 400 };
    }
});
const userLogout = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user.token = null;
        yield user.save();
        return { message: ' logout success', status: 200 };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = payload;
        const user = yield users_model_1.User.findOne({ where: { email: email } });
        if (!user) {
            throw new Error('user is not exsited');
        }
        const token = yield user.generateAuthToken();
        console.log(token);
        yield email_1.default({
            email,
            subject: 'change password',
            text: `${process.env.feHost}/users/setNewPassword?token=${token}`,
        });
        return { message: 'sent mail successfully', status: 200 };
    }
    catch (error) {
        return { error: error.message, status: 400 };
    }
});
const setNewPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //	console.log(payload);
        const { token, password, repeatPassword } = payload;
        if (password !== repeatPassword) {
            throw new Error('password is not matched');
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        if (token == null) {
            throw new Error();
        }
        const user = yield users_model_1.User.findOne({ where: { id: data.id, token: token } });
        if (!user) {
            throw new Error();
        }
        user.password = password;
        yield user.save();
        return { message: 'change password successfully' };
    }
    catch (error) {
        return { error: error.message, status: 400 };
    }
});
exports.default = {
    postUser,
    userLogin,
    userLogout,
    forgotPassword,
    setNewPassword,
};
