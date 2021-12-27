import express from 'express';
import { deleteAccount_post } from '../controllers/deleteAccount.js';

const router = express.Router();

router.post('/', deleteAccount_post);

export default router;
