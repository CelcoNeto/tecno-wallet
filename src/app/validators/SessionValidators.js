import * as Yup from 'yup';
import UserExceptions from '../../utils/exceptions/UserExceptions';
import SessionExceptions from '../../utils/exceptions/SessionExceptions';

class SessionValidators {
  async validationAuthShape(credentials) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    await schema
      .validate(credentials, { abortEarly: false })
      .catch(async err => {
        throw SessionExceptions.UserAuthException(err.errors);
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

export default new SessionValidators();
