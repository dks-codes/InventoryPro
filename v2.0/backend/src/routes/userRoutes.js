import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js'
import { adminAuthMiddleware } from '../middleware/adminAuth.js'
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/create-admin', [authMiddleware, adminAuthMiddleware], userController.createAdmin);

export default router;