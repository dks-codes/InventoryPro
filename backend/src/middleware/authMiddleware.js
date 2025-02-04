import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) { 
    return res.status(401).json({ message: 'Unauthorized! No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) return res.status(401).json({ message: "User not found!" });

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token', error });
  }
};

