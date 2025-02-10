import User from '../models/userModel.js';
import { comparePassword, generateToken, hashPassword } from '../utils/authUtils.js';


export const userController = {
  async register(req, res) {
    try {
      const { username, email, password, dynamicFields } = req.body;

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      const hashedPassword = await hashPassword(password);

      const user = new User({
        username,
        email,
        password: hashedPassword,
        role: 'user',
        dynamicFields
      });

      await user.save();
      const token = generateToken(user);

      res.cookie('authToken', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })

      res.status(201).json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          dynamicFields: user.dynamicFields
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user);

      res.cookie('authToken', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })

      res.json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          dynamicFields: user.dynamicFields
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async logout(req, res){
    res.cookie('authToken', '', { httpOnly: true, maxAge: 0 });
    res.json({ message: 'User logged out! ' });
  },

  async createAdmin(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await hashPassword(password);
      const admin = new User({
        username,
        email,
        password: hashedPassword,
        role: 'admin'
      });

      await admin.save();
      res.status(201).json({
        user: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};