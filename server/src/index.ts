import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import MongoSessionStore from 'connect-mongo';

import * as bodyParser from 'body-parser';

import DB from '@db/index';
import routes from '@/routes';

import ApiErrorMiddleware from "@middlewares/ApiErrorMiddleware";
import "@middlewares/strategies/local-strategy";


class Main {
    server: any;
    PORT: any;
    app: any;

    constructor() {
        this.server = express();
        this.PORT = 4444;
        this.app = null;
    }

    registerMiddleware() {
        // this.server.use(cors({
        //     credentials: true,
        //     origin: [
        //         "http://localhost",
        //         "http://127.0.0.1"
        //     ]
        // }));

        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));

        this.registerSessionMiddleware();

        // server.use('/files', express.static(path.resolve("/services/files-storage")));
        // server.use('/avatars', express.static(path.resolve("/services/files-storage/avatars")));

        this.server.use("/api", routes);
        this.server.use(ApiErrorMiddleware);
    }

    registerSessionMiddleware() {
        this.server.use(cookieParser(process.env.COOKIE_SECRET));
        this.server.use(session({
            secret: process.env.COOKIE_SECRET,
            saveUninitialized: false,
            resave: false,
            store: MongoSessionStore.create({
                //@ts-ignore
                client: mongoose.connection.getClient(),
                touchAfter: 60,
            }),
            cookie: {
                maxAge: 60000 * 60,
            }
        }));

        this.server.use(passport.initialize());
        this.server.use(passport.session());
    }

    async initApp() {
        await DB.connect();

        this.registerMiddleware();

        this.app = this.server.listen(this.PORT, () => {
            console.info(`App is listening on ${this.PORT}`);
        });
    }
};

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
});

process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
});

new Main().initApp();