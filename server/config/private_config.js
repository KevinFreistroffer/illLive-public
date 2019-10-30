module.exports = {
  smtp: {
    username: "",
    password: ""
  },
  // TODO
  database: {
    username: process.env.NODE_ENV === "production" ? "" : "",
    password: process.env.NODE_ENV === "production" ? "" : ""
  },
  production: {
    database: {
      username: "",
      password: "!"
    }
  },
  secret: ""
};
