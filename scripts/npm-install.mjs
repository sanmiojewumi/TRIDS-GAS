import { spawnSync } from 'node:child_process';
import { sanitizeNpmEnv } from './sanitize-npm-env.mjs';

sanitizeNpmEnv();
process.env.NPM_CONFIG_PRODUCTION = 'false';
delete process.env.npm_config_production;

const result = spawnSync('npm', ['install', '--production=false', '--include=dev'], {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(`npm install failed to start: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
