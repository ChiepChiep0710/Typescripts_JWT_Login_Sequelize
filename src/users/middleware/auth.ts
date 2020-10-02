import {  Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { User } from "../users.model"
const auth = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('Authorization').replace('Bearer ', '');
  
	try {
		const data: any = jwt.verify(token, process.env.JWT_KEY);
		if (token == null) {
			throw new Error();
		}
		const user = await User.findOne({ where: { id: data.id, token: token } });
		if (!user) {
			throw new Error();
		}
		req.body.user = user;
		req.body.token = token;
		next();
	} catch (error) {
		res.status(401).send({ error: error.message });
	}
};
export default auth
