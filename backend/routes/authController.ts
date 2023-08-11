import jwt from 'jsonwebtoken';
import secret  from './config';
import { Users, Posts, Likes, Ratings } from '../models';
import bcrypt from 'bcryptjs';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const { password, username, email } = req.body;

      await Users.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 7),
        userType: 'member',
      });
      return res.json({ message: 'Пользователь успешно зарегестрирован' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      res.json('server work');
    } catch (e) {
      console.log(e);
    }
  }
}

export default new authController();
