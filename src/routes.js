import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliverymanOrdersController from './app/controllers/DeliverymanOrdersController';
import OrdersStartController from './app/controllers/OrdersStartController';
import OrdersEndController from './app/controllers/OrdersEndController';

import authAdminMiddleware from './app/middlewares/admin/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/orders', DeliverymanOrdersController.index);

routes.put(
  '/deliveryman/:deliverymanId/orders/:orderId/start',
  OrdersStartController.update
);

routes.put(
  '/deliveryman/:deliverymanId/orders/:orderId/end',
  OrdersEndController.update
);

routes.use(authAdminMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.get('/recipients', RecipientController.index);

routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.destroy);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.destroy);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
