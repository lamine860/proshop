import express from 'express'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'


import products from '../data/products.js'
import Product from '../models/product.js'

const router =  express.Router()


router.get('/',  asyncHandler(async (req, res) => {
    const products = await Product.find()
    return res.json(products)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        return res.json(product)
    }else{
        res.status(404)
        new Error('Product not found')
    }
    return res.json(product)
}))

export default router