import { Router } from 'express';
import { profile, singin, singup } from '../controllers/authController';
import { TokenValidate } from '../libs/validateToken'
const router: Router = Router();
router.post('/signup', singup);

router.post('/signin', singin);

router.get('/profile', TokenValidate, profile);
export default router;
