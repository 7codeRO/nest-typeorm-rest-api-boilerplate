module.exports = {
  apps: [
    {
      name: 'ESTS-API-DEV',
      script: 'dist/main.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',

      env: {
        DATABASE_NAME: 'ests',
        PORT: 3000,
        TCP_PORT: 6060,
        NODE_ENV: 'dev',
      },
    },
  ],
};
