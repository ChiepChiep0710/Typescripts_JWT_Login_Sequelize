import express from 'express';
import {body} from 'express-validator'
import userController from './user.controller';
import auth from  './middleware/auth';
import multer from 'multer'
const upload = multer({dest: '/home/hieu/Desktop/Typescripts_JWT_Login_Sequelize/public/uploads'})
const router = express.Router();
router.post('/users', userController.userPost);
router.post('/users/me/uploadAvatar', upload.single('avatar'), auth, userController.uploadAvatar)
router.post('/users/login', userController.userLogin);
router.get('/users/me', auth, userController.getUser);
router.post('/users/me/logout', auth, userController.userLogout);
router.put('/users/newPassword',userController.newPassword)
router.post('/users/forgotPassword', userController.forgotPassword)
export default router;
