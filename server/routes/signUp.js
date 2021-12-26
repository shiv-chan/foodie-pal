import express from 'express';
import { signUp_post } from '../controllers/signUp.js';

const router = express.Router();

router.post('/', signUp_post);

export default router;
