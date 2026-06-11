import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { checkout, listOrders } from '../controllers/order.controller';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', listOrders);
router.post('/checkout', checkout);

export default router;
