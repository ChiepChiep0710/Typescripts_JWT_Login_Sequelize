"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const environments = {
    development: {
        url: process.env.DEV_URL,
        dialect: 'postgres',
    },
    'test': {
        url: process.env.TEST_URL,
        dialect: 'postgres',
    },
};
exports.default = environments;
