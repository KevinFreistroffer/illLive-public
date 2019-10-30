// ----------
"use strict";
const cluster = require("cluster");
if (cluster.isMaster) {
    var cpus = require("os").cpus().length;
    for (var i = 0; i < cpus; i++) {
        cluster.fork();
    }
}
else {
    // --------------------------------
    let db;
    let dbURI;
    import express = require('express');
    const path = require('path');
    const logger = require('morgan');
    const debug = require('debug');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const session = require('express-session');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const config = require('./config');
    const privateConfig = require('./config/private_config');
    const isSignedIn = require('./middleware/isSignedIn');
    const MongoStore = require('connect-mongo')(session);
    // Express!
    const app = express();
    const router = express.Router();
    // Database connection
    // -------------------
    // TODO something about process.env setting a environment variable
    // something about Heroku variables.
    // TODO should this be in config.online?
    if (config.environment === 'development') {
        dbURI =
            process.env.MONGOLAB_URI ||
                "mongodb://" +
                    privateConfig.database.username +
                    ":" +
                    privateConfig.database.password +
                    "@ds231070.mlab.com:31070/react";
    }
    else {
        dbURI =
            process.env.MONGOLAB_URI ||
                "mongodb://" +
                    privateConfig.production.database.username +
                    ":" +
                    privateConfig.production.database.password +
                    "@ds223653.mlab.com:23653/heroku_z7mwkw86";
    }
    if (config.online) {
        const mongooseConnection = mongoose.connect(dbURI);
        db = mongoose.connection;
        mongoose.set('debug', true);
        db.on("connected", () => {
            console.log("Mongoose connection CONNECTED");
        });
        db.on("error", err => {
            console.log("Mongoose connection ERROR. Error: " + err);
            mongoose.disconnect();
        });
        db.on("disconnected", () => {
            console.log("Mongoose connection DISCONNECTED");
            mongoose.connect(dbURI, { server: { auto_reconnect: true } });
        });
    }
    // App variables
    // --------------------------
    app.set('port', config.port);
    app.set('projectName', 'illLiveBranch');
    app.set('environment', config.environment);
    // Middleware
    // -------------------
    let store;
    if (config.online) {
        store = new MongoStore({
            mongooseConnection: db,
            ttl: 14 * 24 * 60 * 60 // 14 days. default.
        });
    }
    else {
        store = {};
    }
    const sessionConfig = {
        name: 'user_sid',
        secret: config.sessionSecret,
        saveUninitialized: true,
        resave: true,
        store,
        cookie: {
            httpOnly: false,
            secure: config.environment === 'production' // Needs SSL
        },
        gedId: (req) => {
            return genuuid();
        }
    };
    const offlineSessionConfig = {
        name: 'user_sid',
        secret: config.sessionSecret,
        saveUninitialized: true,
        resave: true,
        cookie: {
            httpOnly: false,
            secure: config.environment === 'production' // Needs SSL
        },
        gedId: (req) => {
            return genuuid();
        }
    };
    if (app.get('environment') === 'production') {
        app.set('trust proxy', 1);
        sessionConfig.cookie.secure = true;
    }
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    if (config.online) {
        app.use(session(sessionConfig));
    }
    else {
        app.use(session(offlineSessionConfig));
    }
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use((req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
            console.log(`req.cookies.user_sid && !req.session.user`);
            res.clearCookie('user_sid');
        }
        next();
    });
    app.use(express.static(path.join(__dirname, '../public')));
    let sessionChecker = (req, res, next) => {
        if (req.session.user) {
            res.redirect('/dashboard');
        }
        else {
            next();
        }
    };
    // Routes
    // ------------------------------------
    if (config.online) {
        app.use("/api/user", require('./components/user/usersAPI'));
        app.use("/api/auth/", require('./components/auth/authAPI'));
    }
    else {
        // Offline routes in case I don't have WiFi
        app.use('/api/auth', require('./offline/api'));
    }
    // TOOD rename or redo this I normally wouldn't name it sessionChecker
    app.get('/', sessionChecker, (req, res) => {
        console.log('app.get /');
        res.redirect('/signin');
    });
    // Session login exist or not
    app.get('/', (req, res) => {
        console.log('app.get /');
        res.sendFile(path.join(__dirname, '../public/index.html'));
        console.log(`req.session`, req.session);
        console.log(`req.cookie`, req.cookie);
        if (!req.session.user) {
            console.log('# Login not set in session yet');
        }
        else {
            console.log('# Login from session: ' + req.session.user);
        }
    });
    app.use('*', (req, res) => {
        console.log('app.use *');
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    // Setting server PORT
    // --------------------------------
    app.listen(app.get('port'), () => {
        console.log(`PORT: ${app.get('port')} | ENVIRONMENT: '${app.get('environment')}'`);
    });
    module.exports = app;
}
//# sourceMappingURL=server.js.map