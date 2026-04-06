import express from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", (req, res) => userController.getUsers(req, res));
userRouter.get("/:id", (req, res) => userController.getUserById(req, res));

export default userRouter;
