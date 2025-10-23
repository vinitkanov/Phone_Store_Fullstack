import express from "express";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", userController.getAllUserHandler);
userRouter.get("/users/:id", userController.getUserByIdHandler);
userRouter.post("/users", userController.createUserHandler);
userRouter.put("/users/:id", userController.updateUserHandler);
userRouter.delete("/users/:id", userController.deleteUserHandler);

export default userRouter;
