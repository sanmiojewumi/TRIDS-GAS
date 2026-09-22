import { spawnSync } from 'node:child_process';

const databaseUrl =
  process.env.tridsgas_PRISMA_DATABASE_URL ||
  process.env.tridsgas_DATABASE_URL ||
  process.env.tridsgas_POSTGRES_URL ||
  process.env.DATABASE_URL;

if (!databaseUrl || !/^postgres(ql)?:\/\//i.test(databaseUrl)) {
  throw new Error(
    'A PostgreSQL connection is required. Connect the tridsgas database integration in Vercel.',
  );
}

process.env.DATABASE_URL = databaseUrl;

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const schema = 'prisma/schema.production.prisma';

run('npx', ['prisma', 'generate', '--schema', schema]);
run('npx', ['prisma', 'db', 'push', '--schema', schema]);
run('npx', ['tsx', 'prisma/seed.ts']);
run('npx', ['next', 'build']);
