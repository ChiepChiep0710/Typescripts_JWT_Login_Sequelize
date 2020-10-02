import { Model, DataTypes } from 'sequelize';
import database from '../Database/database';
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const config = {
  tableName: 'User',
  sequelize: database,
};

export class User extends Model {
  static findByCredentials(
    email: any,
    password: any
  ): { user: any; error: any } | PromiseLike<{ user: any; error: any }> {
    throw new Error('Method not implemented.');
  }
  id!: number;
  email!: string;
  password!: string;
  token: string;
  avatar: string;
  generateAuthToken: () => object;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    token: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },

  config
);
User.beforeCreate(async (user: any) => {
  user.password = await bcrypt.hash(user.password, 8);
});

User.prototype.generateAuthToken = async function (): Promise<string> {
  // tao token dua tren id cua user
  const user = this;
  const token: string = jwt.sign({ id: user.id }, process.env.JWT_KEY);
  user.token = token;
  await user.save();
  return token;
};
User.findByCredentials = async function (
  email: string,
  password: string
): Promise<any> {
  // tim user dung
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new Error('user is not exist');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('password is wrong');
    }
    return { user: user };
  } catch (error) {
    return { error: error };
  }
};
User.sync({ force: false }).then(() => console.log('Node table created'));
