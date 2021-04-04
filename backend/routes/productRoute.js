import express from 'express'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import products from '../data/products.js'
import { getProduct, getProducts } from './../controllers/productController.js';

const router =  express.Router()
router.get('/', getProducts)
.get('/:id', getProduct)

export default router