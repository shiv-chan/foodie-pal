import express from 'express';
import { deleteRecipe_post } from '../controllers/deleteRecipe.js';

const router = express.Router();

router.post('/', deleteRecipe_post);

export default router;
