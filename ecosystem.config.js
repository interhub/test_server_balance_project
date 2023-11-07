//doc: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/

// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      script: './build/src/main.js',
      instances: 1,
      watch: false,
      autorestart: true,
      force: true,
      time: true,
      combine_logs: false,
      merge_logs: true,
      exec_mode: 'cluster',
      wait_ready: false,
      name: 'bismap-node',
      error_file: './logs/ecosystem.error.log',
      log_file: './logs/ecosystem.info.log',
      env: {
        PM2: 'yes',
        PORT: 7000,
      },
    },
  ],
};
