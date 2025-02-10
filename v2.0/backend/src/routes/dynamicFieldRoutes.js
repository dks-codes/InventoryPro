import express from 'express';
import { dynamicFieldController } from '../controllers/dynamicFieldController.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminAuthMiddleware } from '../middleware/adminAuth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/add', dynamicFieldController.addField);
router.put('/update-field/:id', dynamicFieldController.updateField);
router.delete('/delete-field/:id', dynamicFieldController.deleteField);
router.get('/get-dynamic-fields/:entity', dynamicFieldController.getDynamicFields);
router.get('/form-fields/:entity', dynamicFieldController.getFormFields);

// For Options
router.post('/add-option', dynamicFieldController.addOption); 
router.put('/update-option', dynamicFieldController.updateOption); 
router.delete('/delete-option', dynamicFieldController.deleteOption);

// For Admin
router.get('/all/fields', adminAuthMiddleware, dynamicFieldController.getAllFields);

export default router;