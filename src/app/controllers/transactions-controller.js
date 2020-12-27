import { BAD_REQUEST, CREATED, OK } from "../../utils/HTTPSTATUS";
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

  async resume(req, res) {
    try {
      const resume = await transactionsService.resume();
      return res.status(OK).json(resume);
    } catch (error) {
      return res.status(BAD_REQUEST).json({ error });
    }
  }
}

export const transactionsController = new TransactionsController();
