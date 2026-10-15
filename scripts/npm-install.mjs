import { spawnSync } from 'node:child_process';
import { sanitizeNpmEnv } from './sanitize-npm-env.mjs';

sanitizeNpmEnv();

const result = spawnSync('npm', ['install'], {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);
