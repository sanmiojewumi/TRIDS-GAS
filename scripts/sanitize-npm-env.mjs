const UNKNOWN_NPM_CONFIGS = new Set(['cache-dir', 'devdir']);

export function sanitizeNpmEnv(env = process.env) {
  for (const key of Object.keys(env)) {
    const lower = key.toLowerCase();

    if (lower === 'cache-dir' || lower === 'cache_dir') {
      delete env[key];
      continue;
    }

    if (!/^npm_config_/i.test(key)) continue;

    const name = key
      .slice('npm_config_'.length)
      .toLowerCase()
      .replace(/_/g, '-');

    if (UNKNOWN_NPM_CONFIGS.has(name)) {
      delete env[key];
    }
  }

  return env;
}
