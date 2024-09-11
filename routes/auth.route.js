// routes/authRoutes.js
import express from 'express';
import { isNotAuthenticated } from '../middlewares/auth.middleware.js';
import { registerUser,loginUser, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/register', isNotAuthenticated, (req, res) => res.render('register.ejs'));
router.post('/register', registerUser);

router.get('/login', isNotAuthenticated, (req, res) => res.render('login.ejs'));
router.post('/login', loginUser);

router.get('/logout', logoutUser);

export default router;
