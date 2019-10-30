export let environment = "development";

export let domain =
  environment === "development"
    ? "http://localhost:3000"
    : "https://illlive.herokuapp.com";

const configs = {
  domain: "http://localhost:3000",
  apiUrl:
    environment === "production"
      ? `https://illLive.herokuapp.com/api`
      : "http://localhost:1337/api",
  environment,
  online: true,
  sessionTimeout: environment === "development" ? 12 : 24, // minutes
  tokenTimeout: environment === "development" ? 100 : 230, // minutes
  minDesktopViewport: 768
};

export default configs;
