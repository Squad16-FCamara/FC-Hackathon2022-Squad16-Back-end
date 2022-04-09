import { Router } from 'express';
import UserController from './controllers/user';
import authMiddleware from './middlewares/auth';

const routes = Router();

routes.get('/', (request, response) => response.json({ message: 'Hello' }));

const userController = new UserController();

routes.post('/user', userController.create);
routes.post('/auth', userController.auth);
routes.get('/user/:id', authMiddleware, userController.get);
routes.get('/search', authMiddleware, userController.search);

export default routes;
