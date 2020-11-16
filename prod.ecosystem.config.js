module.exports = {
  apps: [
    {
      name: 'ESTS-API-PROD',
      script: 'dist/main.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',

      env: {
        DATABASE_NAME: 'ests-prod',
        PORT: 3001,
        TCP_PORT: 7070,
        NODE_ENV: 'dev',
      },
    },
  ],
};
