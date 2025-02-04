import express from 'express';
import { addItem, deleteItem, getAllItems, getItem, searchItems, updateItem } from "../controllers/inventoryController.js";
import { authenticateUser } from '../middleware/authMiddleware.js';

const inventoryRouter = express.Router();

inventoryRouter.use(authenticateUser);

inventoryRouter.get("/", getAllItems);
inventoryRouter.get("/item/:id", getItem);
inventoryRouter.post("/add", addItem);
inventoryRouter.put("/update/:id", updateItem);
inventoryRouter.delete("/delete/:id", deleteItem);
inventoryRouter.get('/search', searchItems);

export default inventoryRouter;