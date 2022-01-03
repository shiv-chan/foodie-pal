import express from 'express';
import { recipes_get, recipes_post } from '../controllers/recipes.js';
const router = express.Router();

router.get('/', recipes_get);
router.post('/', recipes_post);

export default router;
