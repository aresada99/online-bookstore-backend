import express from 'express'

import { test , getAllUsers, getUserById, createUser, updateUser, deleteUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/test', test);
router.get('/',getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id',updateUser)
router.delete('/:id', deleteUser)


export default router;