import { Router } from 'express';
import UserService from '../services/userService';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/loginValidation';

const router = Router();

const userService = new UserService();

const userController = new UserController(userService);

router.post('/', validateLogin, userController.login);

router.get('/validate', userController.validateRole);

export default router;
