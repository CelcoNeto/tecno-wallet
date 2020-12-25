import { CREATED, OK } from "../../utils/HTTPSTATUS";
import { userService } from "../services/user-service";

class UserController {
  async store(req, res) {
    try {
      const user = await userService.store(req.body);
      return res.status(CREATED).json(user);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await userService.update(req.body);
      return res.status(OK).json(updatedUser);
    } catch (error) {
      const errorMessage = JSON.parse(error);
      return res.status(error.status).json(errorMessage);
    }
  }

  async confirmUserEmail(req, res) {
    try {
      await userService.confirmUserEmail(req.body);
      return res.status(OK).json();
    } catch (error) {
      const errorMessage = JSON.parse(error);
      return res.status(error.status).json(errorMessage);
    }
  }
}

export const userController = new UserController();
