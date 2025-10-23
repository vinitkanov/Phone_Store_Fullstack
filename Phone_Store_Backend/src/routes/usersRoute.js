import express from "express";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", userController.getAllUserHandler);
userRouter.get("/users/:id", userController.getUserByIdHandler);
userRouter.post("/users", userController.createUserHandler);
// userRouter.delete('/users/:id', deleteUserHandler)
// userRouter.put('/users/:id', updateUserHandler)

export default userRouter;
