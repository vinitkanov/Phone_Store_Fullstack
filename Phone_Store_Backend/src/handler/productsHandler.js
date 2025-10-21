import { pool } from "../db.js";

// Get all product data
export const getAllProductHandler = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products");
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get product by ID
export const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (product.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "There is no data with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: product[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Add product handler
export const addProductHandler = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const [newProduct] = await pool.query(
      "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
      [name, description, price, stock]
    );
    res.status(201).json({
      status: "success",
      data: { id: newProduct.insertId, name, description, price, stock },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Delete product handler
export const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [deleteProduct] = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    if (deleteProduct.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Update product handler
export const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const [updateProduct] = await pool.query(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
      [name, description, price, stock, id]
    );
    if (updateProduct.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};