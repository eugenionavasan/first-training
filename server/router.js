import express from 'express';
import { getUsers, createUser, deleteUser, editUser } from './controllers';

const router = express.Router();

//GET USERS
router.get('/users', getUsers);

//POST USER

router.post('/users', createUser);

//DELETE USER

router.delete('/users/:id', deleteUser);

//PUT USER

router.put('/users/:id', editUser);

module.exports = router;