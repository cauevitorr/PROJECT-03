import express from 'express'
import { createUser, loginUser } from '../controller/userController.js'

const router = express()

router.post('/register', createUser)
router.post('/login', loginUser)

export default router