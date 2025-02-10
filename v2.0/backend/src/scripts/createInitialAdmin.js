import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import { hashPassword } from '../utils/authUtils.js';

dotenv.config();

async function createInitialAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "InventoryPro" });

    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await hashPassword(process.env.INITIAL_ADMIN_PASSWORD);

    const admin = new User({
      username: process.env.INITIAL_ADMIN_USERNAME,
      email: process.env.INITIAL_ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Initial admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createInitialAdmin();