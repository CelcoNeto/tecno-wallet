import Router from 'express';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddlware from './middlewares/auth';
import multerConfig from './config/multer';

import swaggerDocument from './swagger.config.json';
import CategoriesController from './app/controllers/CategoriesController';
import TransactionsController from './app/controllers/TransactionsController';

const routes = new Router();
const upload = multer(multerConfig);

routes.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.post('/api/users', UserController.store);
routes.post('/api/files', upload.single('file'), FileController.store);
routes.post('/api/login', SessionController.store);

routes.use(authMiddlware);

routes.put('/api/users', UserController.update);

routes.get('/api/categories', CategoriesController.showAll);
routes.post('/api/categories', CategoriesController.store);
routes.get('/api/categories/:id', CategoriesController.show);
routes.put('/api/categories/:id', CategoriesController.update);

routes.post('/api/transactions', TransactionsController.store);

export default routes;
