import { pool } from "../db.js";
import { ResponseError } from "../errors/responseError.js";

export const getAllUser = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age, created_at, updated_at FROM users",
  );
  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role FROM users WHERE id = ?",
    [id],
  );

  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }
};

export const createUser = async (user) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (fullname, username, email, role, address, phone_number, age) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user.fullname,
        user.username,
        user.email,
        user.role,
        user.address,
        user.phone_number,
        user.age,
      ],
    );
  } catch (error) {
    throw new ResponseError(500, "Failed to create user");
  }
};

export const updateUser = async (id, user) => {
  try {
    const [result] = await pool.query(
      "UPDATE users SET fullname = ?, username = ?, email = ?, role = ?, address = ?, phone_number = ?, age = ? WHERE id = ?",
      [
        user.fullname,
        user.username,
        user.email,
        user.role,
        user.address,
        user.phone_number,
        user.age,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      throw new ResponseError(404, "User not found");
    }

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new ResponseError(404, "User not found");
    }

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};
