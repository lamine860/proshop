import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import connect from './config/db.js'
import products from './data/products.js'

dotenv.config()
connect()
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST
const app = express()
app.get('/api/products', (req, res) => {
    return res.json(products)
})
app.get('/api/products/:name', (req, res) => {
    const product = products.find(p => p.name === req.params.name)
    return res.json(product)
})


app.listen(PORT, () => {
    console.log(`Server running ${HOST}:${PORT}`)
})

