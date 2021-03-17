import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import generateToken from '../utils/generateToken.js'

export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && await (user.matchPassword(password))){
        return res.json({
            _id: user._id,
            name: user.name,
            emal: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

export const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body 
    const resistredUser = await User.findOne({email})
    if(resistredUser){
        res.status(400)
        throw new Error('Email address already taken please try other one')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})