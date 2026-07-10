import { signUserToken } from './tokenService.js';

export function toPublicUser(user) {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email || null,
    guest: user.guest,
    createdAt: user.createdAt,
    lastActive: user.lastActive,
    expiresAt: user.expiresAt || null,
  };
}

export function buildAuthResponse(user) {
  return {
    token: signUserToken(user),
    user: toPublicUser(user),
  };
}
