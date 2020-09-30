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
const service_1 = __importDefault(require("./service"));
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: user, status: status, error: error, } = yield service_1.default.postUser(req.body);
    if (user)
        res.status(status).send({ user });
    if (error)
        res.status(status).send(error);
});
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { user: user, status: status, error: error, token: token, } = yield service_1.default.userLogin(req.body);
    if (user)
        res.status(status).send({ user, token });
    if (error)
        res.status(status).send(error);
});
const getUser = (req, res) => {
    res.send(req.body.user);
};
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message: message, status: status, error: error, } = yield service_1.default.userLogout(req.body.user);
    if (message)
        res.status(status).send(message);
    if (error)
        res.status(status).send(error);
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { message: message, status: status, error: error, } = yield service_1.default.forgotPassword(req.body);
    if (message)
        res.status(status).send(message);
    if (error)
        res.status(status).send(error);
});
const setNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { message: message, status: status, error: error, } = yield service_1.default.setNewPassword(req.body);
    if (message)
        res.status(status).send(message);
    if (error)
        res.status(status).send(error);
});
exports.default = {
    userPost,
    userLogin,
    getUser,
    userLogout,
    forgotPassword,
    setNewPassword,
};
