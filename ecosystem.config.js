module.exports = {
  apps: [
    {
      name: "appName",
      script: "app.js",
      time: true,

      args: "one two",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "test",
      },
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
