import TransactionsService from '../services/TransactionsService';
import HTTPSTATUS from '../../utils/HTTPSTATUS';

class TransactionsController {
  async store(req, res) {
    try {
      const payment = await TransactionsService.store({
        ...req.body,
        user_id: req.userId,
      });

      return res.status(HTTPSTATUS.CREATED).json(payment);

    } catch (err) {
      const error = JSON.parse(err);
      return res.status(error.status).json(error);
    }
  }
}

export default new TransactionsController();
