export type AuthUser = {
  id: string;
  username: string;
  email: string | null;
  guest: boolean;
  createdAt: string;
  lastActive: string;
  expiresAt: string | null;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

let currentSession: AuthSession | null = null;

export function setAuthSession(session: AuthSession) {
  currentSession = session;
}

export function getAuthSession() {
  return currentSession;
}

export function getAuthToken() {
  return currentSession?.token ?? null;
}

export function clearAuthSession() {
  currentSession = null;
}
