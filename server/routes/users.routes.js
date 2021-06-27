import express from 'express';
import {
  getUser,
  getUsers,
  postUser,
  updateShelves,
  updateLibrary,
} from '../controller/users.controller.js';

const router = express.Router();

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

router.put('/users/shelves/:userId', updateShelves);
router.put('/users/library/:userId', updateLibrary);

router.post('/users', postUser);

export default router;
