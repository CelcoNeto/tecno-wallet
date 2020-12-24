import * as Yup from 'yup';
import { sessionExceptions } from '../../utils/exceptions/session-exceptions';

class SessionValidators {
  async validationAuthShape(credentials) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema
      .validate(credentials, { abortEarly: false })
      .catch(async (err) => {
        throw sessionExceptions.UserAuthException(err.errors);
      });
  }

  async validationIfUserExists(user) {
    if (!user) {
      throw UserExceptions.UserNotFoundException();
    }
  }

  async verifyPasswordIsEqual(user, password) {
    if (!(await user.checkPassword(password))) {
      throw UserExceptions.PasswordDoesNotMatchException();
    }
  }
}

export const sessionValidators = new SessionValidators();
