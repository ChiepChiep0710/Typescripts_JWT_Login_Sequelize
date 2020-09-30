import express from 'express';

import userController from './user.controller';
import auth from  './middleware/auth';
const router = express.Router();
router.post('/users', userController.userPost);
router.post('/users/login', userController.userLogin);
router.get('/users/me', auth, userController.getUser);
router.post('/users/me/logout', auth, userController.userLogout);
router.put('/users/setNewPassword', userController.setNewPassword);
router.post('/users/forgotPassword', userController.forgotPassword)
export default router;
