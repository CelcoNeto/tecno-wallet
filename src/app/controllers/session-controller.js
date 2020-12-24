import { OK } from '../../utils/HTTPSTATUS';
import { sessionService } from '../services/session-service';

class SessionController {
  async store(req, res) {
    try {
      const user = await sessionService.store(req.body);
      return res.status(OK).json(user);
    } catch (error) {
      const errorMessage = JSON.parse(error);
      return res.status(error.status).json(errorMessage);
    }
  }
}

export const sessionController = new SessionController();
