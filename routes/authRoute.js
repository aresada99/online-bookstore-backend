import express from 'express'
import { test, login, logout } from '../controllers/authController.js';



const router = express.Router();

router.get('/test', test)
router.post('/login', login)
router.post('/logout', logout)


export default router;