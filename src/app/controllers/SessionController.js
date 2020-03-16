import SessionService from '../services/SessionService';

class SessionController {
  async store(req, res) {
    try {
      const user = await SessionService.store(req.body);
      return res.json(user);
    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }
}

export default new SessionController();
