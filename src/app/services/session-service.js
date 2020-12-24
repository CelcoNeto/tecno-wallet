import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { User } from '../models/user';
import { sessionValidators } from '../validators/session-validators';

class SessionService {
  async store(credentials) {
    await sessionValidators.validationAuthShape(credentials);

    const { email, password } = credentials;
    const user = await User.findOne({ where: { email } });

    await sessionValidators.validationIfUserExists(user);
    await sessionValidators.verifyPasswordIsEqual(user, password);

    const { id, name } = user;

    return {
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }
}

export const sessionService = new SessionService();
