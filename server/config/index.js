module.exports = {
  port: process.env.PORT || 1337,
  online: true,
  environment: "development" || process.env.NODE_ENV,
  sessionSecret: "sessionSecret" // TODO make it secret
};
