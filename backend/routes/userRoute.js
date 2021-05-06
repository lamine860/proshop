import express from 'express'
import {getUserProfile, login, register, updateUserProfile} from '../controllers/authController.js'
import {protectMiddleware} from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.route('/profile')
.get(protectMiddleware, getUserProfile)
.put(protectMiddleware, updateUserProfile)

export default router