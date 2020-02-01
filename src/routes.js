import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authAdminMiddleware from './app/middlewares/admin/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);

routes.post('/recipients', authAdminMiddleware, RecipientController.store);

export default routes;
