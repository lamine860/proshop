import asyncHandler from 'express-async-handler'
import Joi from 'joi'
import User from '../models/user.js'
import generateToken from '../utils/generateToken.js'


const userRegisterSchema =  Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().email(),
    password: Joi.string().required().min(3).max(20),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required()
})
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
    const {name, email, password, passwordConfirm} = req.body
    const {value, error} = await userRegisterSchema.validate({name, email, password, passwordConfirm})
    if (error){
        res.status(400)
        throw new Error(JSON.stringify({
            message: error.details,

        }))
    }
    const resistredUser = await User.findOne({email})
    if(resistredUser){
        res.status(400)
        throw new Error(JSON.stringify({message: 'Email address already taken please try other one'}))
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