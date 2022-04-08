import { Router } from 'express';
import UserController from './controllers/user';

const routes = Router();

routes.get('/', (request, response) => response.json({ message: 'Hello' }));

const userController = new UserController();

routes.post('/user', userController.create);

export default routes;
