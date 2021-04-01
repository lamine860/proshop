import express from 'express'
import {login, register, updateUserProfile} from '../controllers/authController.js'
import {protectMiddleware} from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put('/profile', protectMiddleware, updateUserProfile)

export default router