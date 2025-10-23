import { pool } from "../db.js";

export const getAllUserHandler = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, address, phone_number, age, created_at, updated_at FROM users",
    );
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to get users",
    });
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [user] = await pool.query(
      "SELECT id, fullname, username, email, role FROM users WHERE id = ?",
      [id],
    );
    if (user.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: user[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to get user",
    });
  }
};

export const addUserHandler = async (req, res) => {
  try {
    const {
      fullname,
      username,
      email,
      password,
      role,
      address,
      phone_number,
      age,
    } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Fullname, username, email, and password are required",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        fullname,
        username,
        email,
        password,
        role || "user",
        address,
        phone_number,
        age,
      ],
    );

    res.status(201).json({
      status: "success",
      data: {
        id: result.insertId,
        fullname,
        username,
        email,
        role: role || "user",
        address,
        phone_number,
        age,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add user",
    });
  }
};

export const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleteUser] = await pool.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);
    if (deleteUser.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete user",
    });
  }
};

export const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { fullname, username, email, role, address, phone_number, age } =
    req.body;
  try {
    const [result] = await pool.query(
      "UPDATE users SET fullname = ?, username = ?, email = ?, role = ?, address = ?, phone_number = ?, age = ? WHERE id = ?",
      [fullname, username, email, role, address, phone_number, age, id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};
