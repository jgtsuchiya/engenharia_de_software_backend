import { Router } from 'express';
import authRoutes from './auth.routes';
import customerRoutes from './customer.routes';
import merchantRoutes from './merchant.routes';
import productRoutes from './product.routes';
import favoriteRoutes from './favorite.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/customers/:customerId/favorites', favoriteRoutes);
router.use('/merchants', merchantRoutes);
router.use('/products', productRoutes);

export default router;
