import { CREATED } from '../../utils/HTTPSTATUS';
import { transactionsService } from '../services/transactions-service';

class TransactionsController {
  async store(req, res) {
    try {
      const payment = await transactionsService.store({
        ...req.body,
        user_id: req.userId,
      });

      return res.status(CREATED).json(payment);
    } catch (error) {
      const errorMessage = JSON.parse(error);
      return res.status(error.status).json(errorMessage);
    }
  }
}

export const transactionsController = new TransactionsController();
