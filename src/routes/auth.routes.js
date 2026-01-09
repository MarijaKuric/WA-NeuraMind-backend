import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { loginAdmin } from '../../controllers/authController.js'

const router = express.Router()

router.post('/login', loginAdmin)


export default router
