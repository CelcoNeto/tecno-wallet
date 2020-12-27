const {
  transactionsController,
} = require("../app/controllers/transactions-controller");
const { route } = require("../utils/route");
import authMiddlware from "../middlewares/auth";

route.use(authMiddlware);
route.get("/api/resume", transactionsController.resume);
route.post("/api/transactions", transactionsController.store);

export default route;
