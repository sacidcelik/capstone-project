import express from 'express';
import { googleSearch } from '../controller/search.controller.js';

const router = express.Router();

router.post('/searchAPI', googleSearch);

export default router;
