"use strict";

const cluster = require("cluster");

if (cluster.isMaster) {
  const cpus = require("os").cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  let db;
  let dbURI;
  const express = require("express");
  const path = require("path");
  const logger = require("morgan");
  const debug = require("debug");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const session = require("express-session");
  const cookieParser = require("cookie-parser");
  const bodyParser = require("body-parser");
  const config = require("./config");
  const privateConfig = require("./config/private_config");
  const isAuthenticatedMiddleware = require("./middleware/authenticationMiddleware");
  const MongoStore = require("connect-mongo")(session);
  const { clientErrorHandler, errorHandler } = require("./error_handlers");

  // Express!
  const app = express();
  const router = express.Router();

  // Database connection
  // -------------------
  // TODO something about process.env setting a environment variable
  // something about Heroku variables.
  // TODO should this be in config.online?
  if (
    config.environment === "development" &&
    process.env.ENVIRONMENT !== "production"
  ) {
    dbURI =
      process.env.MONGOLAB_URI ||
      "mongodb://" +
        privateConfig.database.username +
        ":" +
        privateConfig.database.password +
        "@ds231070.mlab.com:31070/react";
  }

  // if (process.env.ENVIRONMENT === "production") {
  //     dbURI = process.env.MONGODB_URI;
  // }

  if (config.online) {
    const mongooseConnection = mongoose.connect(dbURI, {
      useNewUrlParser: true
    });
    db = mongoose.connection;
    mongoose.set("debug", true);
    db.on("connected", () => {
      console.log("Mongoose connection CONNECTED");
    });
    db.on("error", err => {
      console.log("Mongoose connection ERROR. Error: " + err);
      mongoose.disconnect();
    });
    db.on("disconnected", () => {
      console.log("Mongoose connection DISCONNECTED");
      mongoose.connect(dbURI, {
        server: { auto_reconnect: true },
        useFindAndModify: false
      });
    });
  }

  // App variables
  // --------------------------
  app.set("port", config.port);
  app.set("projectName", "illLiveBranch");
  app.set("environment", config.environment);

  // Middleware
  // -------------------
  let store;
  if (config.online) {
    store = new MongoStore({
      mongooseConnection: db,
      ttl: 30 * 24 * 60 * 60 // 14 days. default.
    });
  } else {
    store = {};
  }

  const sessionConfig = {
    name: "user_sid",
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: true,
    store,
    domain: "http://localhost:1337",
    cookie: {
      httpOnly: false,
      secure: config.environment === "production" // Needs SSL
    },
    gedId: req => {
      return genuuid();
    }
  };

  const offlineSessionConfig = {
    name: "user_sid",
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: true,
    cookie: {
      //httpOnly: false,
      secure: false // Needs SSL
    },
    gedId: req => {
      return genuuid();
    }
  };

  if (app.get("environment") === "production") {
    app.set("trust proxy", 1);
    sessionConfig.cookie.secure = true;
  }

  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  if (config.online) {
    app.use(session(sessionConfig));
  } else {
    app.use(session(offlineSessionConfig));
  }

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );

  app.use((req, res, next) => {
    console.log(req.protocol);
    console.log(`req.session.userID`, req.cookies.user_sid, req.session.userID);
    // If a cookie is passed and there's no session.userID,
    // delete the should-not-exist-cookie.
    if (req.cookies.user_sid && !req.session.userID) {
      res.clearCookie("user_sid");
    }

    // If there is no cookie and there is a session, then destroy the session
    if (!req.cookies.user_sid && req.session.userID) {
      store.destroy(req.session.userID);
    }
    next();
  });

  app.use(express.static(path.join(__dirname, "../public")));

  // Routes
  // ------------------------------------
  if (config.online) {
    app.use(
      "/api/user",
      isAuthenticatedMiddleware,
      require("./components/user/usersAPI")
    );
    app.use("/api/auth/", require("./components/auth/authAPI"));
  } else {
    // Offline routes in case I don't have WiFi
    app.use("/api/auth", require("./offline/api"));
  }

  app.use(clientErrorHandler);
  app.use(errorHandler);

  app.use(function(req, res, next) {
    console.log(`404 error`);
    res.status(404).json({
      data: "Sorry, can't find that!"
    });
  });

  // Setting server PORT
  // --------------------------------
  app.listen(app.get("port"), () => {
    if (
      config.environment === "development" ||
      process.env.ENVIRONMENT !== "production"
    ) {
      console.log(
        `PORT: ${app.get("port")} | ENVIRONMENT: '${app.get("environment")}'`
      );
    }
  });
  module.exports = app;
}
