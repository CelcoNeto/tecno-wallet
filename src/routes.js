import Router from 'express';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import { categoriesController } from './app/controllers/categories-controller';
import { fileController } from './app/controllers/file-controller';
import { sessionController } from './app/controllers/session-controller';
import { transactionsController } from './app/controllers/transactions-controller';
import { userController } from './app/controllers/user-controller';
import multerConfig from './config/multer';
import authMiddlware from './middlewares/auth';
import swaggerDocument from './swagger.config.json';

const routes = new Router();
const upload = multer(multerConfig);

routes.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.post('/api/users', userController.store);
routes.post('/api/files', upload.single('file'), fileController.store);
routes.post('/api/login', sessionController.store);

routes.use(authMiddlware);

routes.put('/api/users', userController.update);

routes.get('/api/categories', categoriesController.showAll);
routes.post('/api/categories', categoriesController.store);
routes.get('/api/categories/:id', categoriesController.show);
routes.put('/api/categories/:id', categoriesController.update);

routes.post('/api/transactions', transactionsController.store);

export { routes };
