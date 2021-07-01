import express from 'express';
import {
  getUser,
  getUsers,
  postUser,
  sendShelf,
  sendBook,
  updateShelf,
  updateLibrary,
  deleteStoredBook,
} from '../controller/users.controller.js';

const router = express.Router();

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

router.put('/users/shelves/:userId', sendShelf);
router.put('/users/shelvesUpdate/:userId', updateShelf);
router.put('/users/library/:userId', sendBook);
router.put('/users/libraryUpdate/:userId', updateLibrary);

router.post('/users', postUser);

router.delete(
  '/users/:userId/shelves/:shelfId/columns/:columnId/compartment/:compartmentId/storedBooks/:storedBookId',
  deleteStoredBook
);

export default router;
