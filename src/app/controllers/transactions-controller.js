import { CREATED } from "../../utils/HTTPSTATUS";
import { transactionsService } from "../services/transactions-service";

class TransactionsController {
  async store(req, res) {
    try {
      const transaction = await transactionsService.store({
        ...req.body,
        user_id: req.userId,
      });

      return res.status(CREATED).json(transaction);
    } catch (error) {
      const { status, errors } = JSON.parse(error);
      return res.status(status).json({ errors });
    }
  }
}

export const transactionsController = new TransactionsController();
