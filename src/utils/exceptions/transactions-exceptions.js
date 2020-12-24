import { UNPROCESSABLE_ENTITY } from '../HTTPSTATUS';

class TransactionsExceptions {
  transactionsException(errors) {
    return JSON.stringify({
      status: UNPROCESSABLE_ENTITY,
      errors,
    });
  }
}

export const transactionsExceptions = new TransactionsExceptions();
