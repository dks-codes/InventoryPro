import express from 'express';
import { inventoryController } from '../controllers/inventoryController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', inventoryController.getAllItems);
router.get('/:id', inventoryController.getItem);
router.post('/create', inventoryController.create);
router.put('/update/:id', inventoryController.update);
router.delete('/delete/:id', inventoryController.deleteItem);

export default router;