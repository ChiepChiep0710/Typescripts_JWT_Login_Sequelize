import { User } from './users.model';
import jwt from 'jsonwebtoken';
import sendMail from '../ultils/email';
import bcrypt from 'bcryptjs'
const postUser = async (body: any) => {
	try {
		const user = await User.create(body);

		return { user: user, status: 201 };
	} catch (error) {
		return { error: error.message, status: 400 };
	}
};
const userLogin = async (body: any) => {
	try {
		const { email, password } = body;
		const { user: user, error: error } = await User.findByCredentials(
			email,
			password
		);

		if (error) {
			throw new Error(error);
		}
		const token = await user.generateAuthToken();
		return { status: 201, user: user, token: token };
	} catch (error) {
		return { error: error.message, status: 400 };
	}
};

const userLogout = async (user: any) => {
	try {
		user.token = null;
		await user.save();
		return { message: ' logout success', status: 200 };
	} catch (error) {
		return { error: error.message, status: 500 };
	}
};
const forgotPassword = async (payload: { email: string }) => {
	try {
		const { email } = payload;
		const user = await User.findOne({ where: { email: email } });
		if (!user) {
			throw new Error('user is not exsited');
		}
		const token = await user.generateAuthToken();
		console.log(token);
		await sendMail({
			email,
			subject: 'change password',
			text: `${process.env.feHost}/users/newPassword?token=${token}`,
		});
		return { message: 'sent mail successfully', status: 200 };
	} catch (error) {
		return { error: error.message, status: 400 };
	}
};
const setNewPassword = async (payload: {
	token: string;
	password: string;
	repeatPassword: string;
}) => {
	try {
		const { token, password, repeatPassword } = payload;
		if (password !== repeatPassword) {
			throw new Error('password is not matched');
		}
		const data: any = jwt.verify(token, process.env.JWT_KEY);
		if (token == null) {
			throw new Error();
		}
		const user = await User.findOne({ where: { id: data.id, token: token } });
		if (!user) {
			throw new Error();
		}
		user.password = await bcrypt.hash(password, 8);
		await user.save();
		return { message: 'change password successfully', status: 200 };
	} catch (error) {
		return { error: error.message, status: 400 };
	}
};
const uplodadAvatar = async (user: any, file: any )=>{
	try {
		user.avatar = file.path.split('/').slice(1).join('/');
		await user.save();
		return { message: ' upload successfully ', status: 200 };
	} catch (error) {
		return { error: error.message, status: 400 };
	}

}

export default {
	postUser,
	userLogin,
	userLogout,
	forgotPassword,
	setNewPassword,
	uplodadAvatar
};
