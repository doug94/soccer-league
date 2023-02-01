import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/loginValidation';

const router = Router();

const userController = new UserController();

router.post('/', validateLogin, userController.login);

export default router;
