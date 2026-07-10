import { apiRequest } from './apiClient';
import type { AuthSession } from './authSession';

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export function registerUser(payload: RegisterPayload) {
  return apiRequest<AuthSession>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: LoginPayload) {
  return apiRequest<AuthSession>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function createGuestSession() {
  return apiRequest<AuthSession>('/api/auth/guest', {
    method: 'POST',
  });
}

export function deleteCurrentUser() {
  return apiRequest<{ message: string }>('/api/users/me', {
    method: 'DELETE',
    auth: true,
  });
}
