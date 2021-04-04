import express from 'express'
import { placeOrder } from './../controllers/orderController.js';

const router = express.Router()


router.post('/', placeOrder)

export default router