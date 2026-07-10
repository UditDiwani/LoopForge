import dns from 'node:dns';
import { env } from './env.js';

export function configureDns() {
  const servers = env.dnsServers
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers.length === 0) {
    return;
  }

  dns.setServers(servers);
  console.log(`DNS resolvers configured: ${servers.join(', ')}`);
}
