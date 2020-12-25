import { CREATED, OK } from "../../utils/HTTPSTATUS";
import { userService } from "../services/user-service";

class UserController {
  async store(req, res) {
    try {
      const user = await userService.store(req.body);
      return res.status(CREATED).json(user);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await userService.update(req.body);
      return res.status(OK).json(updatedUser);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }

  async confirmUserEmail(req, res) {
    try {
      await userService.confirmUserEmail(req.body);
      return res.status(OK).json();
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }
}

export const userController = new UserController();
