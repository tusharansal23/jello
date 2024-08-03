import express from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem, addRatingAndComment } from '../controllers/itemController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', authMiddleware, adminMiddleware, createItem);
router.put('/:id', authMiddleware, adminMiddleware, updateItem);
router.delete('/:id', authMiddleware, adminMiddleware, deleteItem);
router.post('/:id/rate', authMiddleware, addRatingAndComment);

export default router;
