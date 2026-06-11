import { Router } from 'express';
import { login, register, recoverPassword, resetPassword } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/recover', recoverPassword);
router.post('/recover/reset', resetPassword);

export default router;
