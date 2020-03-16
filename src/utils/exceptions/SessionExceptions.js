import HTTPSTATUS from '../HTTPSTATUS';

class SessionExceptions {
  UserAlreadyExistsException(email) {
    return JSON.stringify({
      status: HTTPSTATUS.BAD_REQUEST,
      errors: [`User with email ${email} already exists.`],
    });
  }

  UserAuthException(errors) {
    return JSON.stringify({
      status: HTTPSTATUS.UNPROCESSABLE_ENTITY,
      errors,
    });
  }
}

export default new SessionExceptions();
