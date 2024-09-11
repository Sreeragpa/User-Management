import express from 'express';
import {  updateUser,deleteUser,editUserPage,getAllUsers } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', isAuthenticated, getAllUsers);
router.get('/users/edit/:id', isAuthenticated, editUserPage);
router.post('/users/edit/:id', isAuthenticated, updateUser);
router.delete('/users/delete/:id', isAuthenticated, deleteUser);
export default router;