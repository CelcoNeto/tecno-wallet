import HTTPSTATUS from '../HTTPSTATUS';

class UserExceptions {
  UserAlreadyExistsException(email) {
    return JSON.stringify({
      status: HTTPSTATUS.BAD_REQUEST,
      errors: [`User with email ${email} already exists.`],
    });
  }

  PasswordDoesNotMatchException() {
    return JSON.stringify({
      status: HTTPSTATUS.UNAUTHORIZED,
      errors: ['Password does not match.'],
    });
  }

  UserDontConfirmEmailException() {
    return JSON.stringify({
      status: HTTPSTATUS.UNAUTHORIZED,
      errors: [`The user has not yet confirmed the email.`],
    });
  }

  UserConfirmEmailException() {
    return JSON.stringify({
      status: HTTPSTATUS.UNAUTHORIZED,
      errors: [`The user has already confirmed the email.`],
    });
  }

  UserNotFoundException() {
    return JSON.stringify({
      status: HTTPSTATUS.BAD_REQUEST,
      errors: ['User not found.'],
    });
  }

  UserStoreValidationException(errors) {
    return JSON.stringify({
      status: HTTPSTATUS.UNPROCESSABLE_ENTITY,
      errors,
    });
  }
}

export default new UserExceptions();
