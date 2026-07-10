import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signUserToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      guest: user.guest,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
}

export function verifyUserToken(token) {
  return jwt.verify(token, env.jwtSecret);
}
