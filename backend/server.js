import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST
const app = express()


app.listen(PORT, () => {
    console.log(`Server running ${HOST}:${PORT}`)
})

