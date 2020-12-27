import multer from "multer";
import { fileController } from "../app/controllers/file-controller";
import { sessionController } from "../app/controllers/session-controller";
import { userController } from "../app/controllers/user-controller";
import multerConfig from "../config/multer";
import { route } from "../utils/route";

const upload = multer(multerConfig);
route.post("/api/users", userController.store);
route.post("/api/login", sessionController.store);
route.post("/api/files", upload.single("file"), fileController.store);
route.put("/api/users", userController.update);

export default route;
