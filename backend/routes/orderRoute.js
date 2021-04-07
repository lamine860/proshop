import express from 'express'
import { protectMiddleware } from '../middleware/AuthMiddleware.js';
import { placeOrder } from './../controllers/orderController.js';

const router = express.Router()


router.post('/', protectMiddleware,placeOrder)

export default router