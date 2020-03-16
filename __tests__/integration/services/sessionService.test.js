import app from '../../../src/app';

import User from '../../../src/app/models/User';
import SessionService from '../../../src/app/services/SessionService';

describe('SessionService', () => {
  beforeAll(async () => {
    await User.create({
      name: 'Dummy Email',
      email: 'email_credentials@email.com',
      password: 'secret'
    });
  });


  it('when call auth with empty credentials should throw yup error', async () => {
    const credentials = {}

    await SessionService.store(credentials).catch((err) => {
      const error = JSON.parse(err);
      expect(error.status).toEqual(422);

      const { errors } = error;

      expect(errors.length).toEqual(2);
      expect(errors[0]).toEqual('email is a required field');
      expect(errors[1]).toEqual('password is a required field');
    })
  });

  it('when call auth and not found user should throw user not found exception', async () => {
    const credentials = {
      email: 'invalid_email@email.com',
      password: 'secret'
    }

    await SessionService.store(credentials).catch((err) => {
      const error = JSON.parse(err);

      expect(error.status).toEqual(400);

      const { errors } = error;

      expect(errors.length).toEqual(1);
      expect(errors[0]).toEqual('User not found.');
    })
  });

  it('when call auth and user wrong password should throw password does not match exception', async () => {

    const user = await User.findOne({ where: { email: 'email_credentials@email.com' } });

    const credentials = {
      email: user.email,
      password: 'wrongsecret'
    }

    await SessionService.store(credentials).catch((err) => {
      const error = JSON.parse(err);

      expect(error.status).toEqual(401);

      const { errors } = error;

      expect(errors.length).toEqual(1);
      expect(errors[0]).toEqual('Password does not match.');
    })
  });

  it('when call auth should return user and token', async () => {

    const user = await User.findOne({ where: { email: 'email_credentials@email.com' } });

    const credentials = {
      email: user.email,
      password: 'secret'
    }

    const result = await SessionService.store(credentials);

    expect(result).not.toBe(null);
    expect(result.user.id).toBe(user.id);
    expect(result.user.name).toBe(user.name);
    expect(result.user.email).toBe(user.email);
    expect(result.token).not.toBe(null);
  });

  afterAll(async () => {
    await User.destroy({ where: { email: 'email_credentials@email.com' } });
  });
});
