import * as UserService from "../services/userService.js";

export const getAllUserHandler = async (req, res) => {
  try {
    const users = await UserService.getAllUser(); // ✅ Different name!
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const response = await UserService.getUserById(req.params.id);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserHandler = async (req, res) => {
  try {
    const response = await UserService.createUser(req.body);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
