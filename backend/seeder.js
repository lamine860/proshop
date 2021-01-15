import dotenv from 'dotenv'
import mongoose from 'mongoose'
import colors from 'colors'

import connect from './config/db.js'
import User from './models/user.js'
import Product from './models/product.js'
import usersSeeders from './data/user.js'
import productSeeder from './data/products.js'

dotenv.config()
connect()

const importData = async () => {
    try{
        await User.deleteMany()
        await Product.deleteMany()
        const createdUser = await User.insertMany(usersSeeders)
        const adminUserId = createdUser[0]._id
        const products = productSeeder.map(product => {
            return {...product, user: adminUserId}
        })
        await Product.insertMany(products)
        console.log('Data imported'.green)
        process.exit()
    }catch(error){
        console.log(`Data importations error ${error.message}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await User.deleteMany()
        await Product.deleteMany()
        console.log('Data destroyed'.red)
        process.exit(1)
    }catch(error) {
        console.log(error.message.red.inverse)
        process.exit(1)
    }

}
console.log('=============', process.argv)

if (process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}