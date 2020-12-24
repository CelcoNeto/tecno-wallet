import { BAD_REQUEST, UNPROCESSABLE_ENTITY } from '../HTTPSTATUS';

class SessionExceptions {
  UserAlreadyExistsException(email) {
    return JSON.stringify({
      status: BAD_REQUEST,
      errors: [`User with email ${email} already exists.`],
    });
  }

  UserAuthException(errors) {
    return JSON.stringify({
      status: UNPROCESSABLE_ENTITY,
      errors,
    });
  }
}

export const sessionExceptions = new SessionExceptions();
