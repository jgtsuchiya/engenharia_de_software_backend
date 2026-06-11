import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { getProfile, updateProfile, deleteAccount } from '../controllers/customer.controller';

const router = Router();

router.use(authMiddleware);

router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteAccount);

export default router;
