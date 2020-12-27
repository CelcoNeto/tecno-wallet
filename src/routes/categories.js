import { categoriesController } from "../app/controllers/categories-controller";
import { route } from "../utils/route";
import authMiddlware from "../middlewares/auth";

route.use(authMiddlware);
route.get("/api/categories", categoriesController.showAll);
route.post("/api/categories", categoriesController.store);
route.get("/api/categories/:id", categoriesController.show);
route.put("/api/categories/:id", categoriesController.update);
export default route;
