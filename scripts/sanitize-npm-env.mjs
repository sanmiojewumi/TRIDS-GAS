const UNKNOWN_NPM_CONFIGS = new Set(['cache-dir', 'devdir']);

export function sanitizeNpmEnv(env = process.env) {
  for (const key of Object.keys(env)) {
    if (!/^npm_config_/i.test(key)) continue;

    const name = key
      .slice('npm_config_'.length)
      .toLowerCase()
      .replace(/_/g, '-');

    if (!UNKNOWN_NPM_CONFIGS.has(name)) continue;

    if (name === 'cache-dir' && !env.npm_config_cache) {
      env.npm_config_cache = env[key];
    }

    delete env[key];
  }

  return env;
}
