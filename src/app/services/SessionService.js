import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';
import SessionValidators from '../validators/SessionValidators';

class SessionService {
  async store(credentials) {
    await SessionValidators.validationAuthShape(credentials);

    const { email, password } = credentials;
    const user = await User.findOne({ where: { email } });

    await SessionValidators.validationIfUserExists(user);
    await SessionValidators.verifyPasswordIsEqual(user, password);

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

export default new SessionService();
