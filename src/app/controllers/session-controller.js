import { OK } from "../../utils/HTTPSTATUS";
import { sessionService } from "../services/session-service";

class SessionController {
  async store(req, res) {
    try {
      const user = await sessionService.store(req.body);
      return res.status(OK).json(user);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }
}

export const sessionController = new SessionController();
