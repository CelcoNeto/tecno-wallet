import HTTPSTATUS from '../HTTPSTATUS';

class TransactionsExceptions {
  transactionsException(errors) {
    return JSON.stringify({
        status: HTTPSTATUS.UNPROCESSABLE_ENTITY,
        errors,
    });
  }
}

export default new TransactionsExceptions();
