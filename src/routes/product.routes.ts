import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/product.controller';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);

router.use(authMiddleware);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
