import dotenv from 'dotenv';

dotenv.config();

function parseClientOrigins(value) {
  return value
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

export const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientOrigin: parseClientOrigins(process.env.CLIENT_ORIGIN || 'http://localhost:5173'),
  guestSessionHours: Number(process.env.GUEST_SESSION_HOURS || 24),
  dnsServers: process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1',
};

export function validateEnv() {
  const missing = [];

  if (!env.mongoUri) {
    missing.push('MONGODB_URI');
  }

  if (!env.jwtSecret) {
    missing.push('JWT_SECRET');
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
