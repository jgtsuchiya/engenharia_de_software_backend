import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { listFavorites, addFavorite, removeFavorite } from '../controllers/favorite.controller';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', listFavorites);
router.post('/', addFavorite);
router.delete('/:productId', removeFavorite);

export default router;
