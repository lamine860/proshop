import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'


import connect from './config/db.js'
import products from './data/products.js'
import { ErrorHandler, notFound } from './middleware/ErrorMiddleware.js'
import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRoute.js'

dotenv.config()
connect()
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST
const app = express()

//Routes
app.use('/api/products', productRouter)
app.use('/api/user', userRouter)


app.use(notFound)
app.use(ErrorHandler)

app.listen(PORT, () => {
    console.log(`Server running ${HOST}:${PORT}`)
})

