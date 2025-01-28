import express from 'express';
import { addItem, deleteItem, getAllItems, getItem, searchItems, updateItem } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/item/:id", getItem);
router.post("/add", addItem);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);
router.get('/search', searchItems);

export default router;