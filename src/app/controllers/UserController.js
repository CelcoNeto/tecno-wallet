import UserService from '../services/UserService';
import HTTPSTATUS from '../../utils/HTTPSTATUS';

class UserController {
  async store(req, res) {
    try {
      const user = await UserService.store(req.body);
      return res.status(HTTPSTATUS.CREATED).json(user);
    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await UserService.update(req.body);
      return res.json(updatedUser);
    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }

  async confirmUserEmail(req, res) {
    try {
      await UserService.confirmUserEmail(req.body);
      return res.json();
    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }
}

export default new UserController();
