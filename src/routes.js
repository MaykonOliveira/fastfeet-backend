import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authAdminMiddleware from './app/middlewares/admin/auth';

const routes = Router();

routes.post('/users', authAdminMiddleware, UserController.store);

routes.post('/sessions', SessionController.store);

export default routes;
