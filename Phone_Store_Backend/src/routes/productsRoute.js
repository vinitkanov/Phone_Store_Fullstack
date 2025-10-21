import express from 'express'
import { 
  deleteProductHandler, 
  getAllProductHandler, 
  getProductByIdHandler, 
  addProductHandler,  // 👈 Don't forget to import this!
  updateProductHandler 
} from '../handler/productsHandler.js'

const productRouter = express.Router()

productRouter.get("/products", getAllProductHandler)
productRouter.get("/products/:id", getProductByIdHandler)
productRouter.post("/products", addProductHandler)  // ✅ Fixed!
productRouter.delete("/products/:id", deleteProductHandler)
productRouter.put("/products/:id", updateProductHandler)

export default productRouter