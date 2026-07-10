import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { configureDns } from './config/dns.js';
import { env, validateEnv } from './config/env.js';

async function startServer() {
  validateEnv();
  configureDns();
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`LoopForge API listening on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
