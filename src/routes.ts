import { Router } from 'express';
import ConnectedUsersController from './controllers/connectedUsers';
import FeedbackController from './controllers/feedback';
import UserController from './controllers/user';
import authMiddleware from './middlewares/auth';

const routes = Router();

routes.get('/', (request, response) => response.json({ message: 'Hello' }));

const userController = new UserController();

routes.post('/user', userController.create);
routes.post('/auth', userController.auth);
routes.get('/users', authMiddleware, userController.getAll);
routes.get('/user/:id', authMiddleware, userController.get);
routes.get('/search', authMiddleware, userController.search);

const feedbackController = new FeedbackController();

routes.post('/feedback', authMiddleware, feedbackController.create);

const connectedUsersController = new ConnectedUsersController();

routes.post('/connect', authMiddleware, connectedUsersController.create);

export default routes;
