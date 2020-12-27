import Router from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.config.json";
import routesCategories from "./categories";
import routesUsers from "./users";
import routesTransactions from "./transactions";
const routes = new Router();
routes.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use(routesUsers);
routes.use(routesCategories);
routes.use(routesTransactions);

export { routes };
