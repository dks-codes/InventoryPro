import express from "express";
import { deleteUser, login, logout, profile, register } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login)
userRouter.post("/logout",authenticateUser, logout);
userRouter.delete("/deleteUser",authenticateUser, deleteUser);
userRouter.get("/profile",authenticateUser, profile);

export default userRouter;