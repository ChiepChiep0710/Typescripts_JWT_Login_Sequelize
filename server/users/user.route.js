"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_1 = __importDefault(require("./middleware/auth"));
const multer_1 = __importDefault(require("multer"));
const upload = multer_1.default({
    dest: '/home/hieu/Desktop/Typescripts_JWT_Login_Sequelize/public/uploads/',
});
const router = express_1.default.Router();
router.post('/users', user_controller_1.default.userPost);
router.post('/users/me/uploadAvatar', upload.single('avatar'), auth_1.default, user_controller_1.default.uploadAvatar);
router.post('/users/login', user_controller_1.default.userLogin);
router.get('/users/me', auth_1.default, user_controller_1.default.getUser);
router.post('/users/me/logout', auth_1.default, user_controller_1.default.userLogout);
router.post('/users/forgotPassword', user_controller_1.default.forgotPassword);
router.put('/users/setNewPassword', user_controller_1.default.setNewPassword);
exports.default = router;
