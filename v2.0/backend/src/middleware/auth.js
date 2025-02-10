import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(' ')[1];
    const token = req.cookies.authToken;
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    req.user.isAdmin = user.role === 'admin';
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};