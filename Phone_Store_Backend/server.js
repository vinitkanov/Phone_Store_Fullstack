import express from 'express'
import { testConnection } from './src/db.js'
import userRouter from './src/routes/usersRoute.js'
import productRouter from './src/routes/productsRoute.js'
import cors from 'cors'

const app = express()
const port = 3000

// ADD THESE TWO LINES! 🔥
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// THEN your routes
app.use(userRouter)
app.use(productRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    testConnection()
})