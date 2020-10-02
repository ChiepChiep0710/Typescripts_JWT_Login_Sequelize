import { Request, Response } from 'express';
import userService from './service';
const userPost = async (req: Request, res: Response) => {
  const {
    user: user,
    status: status,
    error: error,
  } = await userService.postUser(req.body);
  if (user) res.status(status).send({ user });
  if (error) res.status(status).send(error);
};
const userLogin = async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    user: user,
    status: status,
    error: error,
    token: token,
  } = await userService.userLogin(req.body);
  if (user) res.status(status).send({ user, token });
  if (error) res.status(status).send(error);
};
const getUser = (req: Request, res: Response) => {
  res.send(req.body.user);
};
const userLogout = async (req: Request, res: Response) => {
  const {
    message: message,
    status: status,
    error: error,
  } = await userService.userLogout(req.body.user);
  if (message) res.status(status).send(message);
  if (error) res.status(status).send(error);
};
const forgotPassword = async (req: Request, res: Response) => {
  console.log(req);
  const {
    message: message,
    status: status,
    error: error,
  } = await userService.forgotPassword(req.body);
  if (message) res.status(status).send(message);
  if (error) res.status(status).send(error);
};
const setNewPassword = async (req: Request, res: Response) => {
  //console.log(req.body)
  const {
    message: message,
    status: status,
    error: error,
  } = await userService.setNewPassword(req.body);
  if (message) res.status(status).send(message);
  if (error) res.status(status).send(error);
};
const uploadAvatar = async (req: Request, res: Response) => {
  //console.log(req.file)
  const {
    message: message,
    status: status,
    error: error,
  } = await userService.uplodadAvatar(req.body.user, req.file);
  if (message) res.status(status).send(message);
  if (error) res.status(status).send(error);
};

export default {
  userPost,
  userLogin,
  getUser,
  userLogout,
  forgotPassword,
  setNewPassword,
  uploadAvatar,
};
