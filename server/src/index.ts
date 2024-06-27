import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as bodyParser from 'body-parser';

import DB from '@db/index';
import routes from '@/routes';

import ApiErrorMiddleware from "@middlewares/ApiErrorMiddleware";

const server = express();
const PORT = 4444;
let app = null;

server.use(cors({
    credentials: true,
    origin: [
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:8081",
        "http://127.0.0.1:8081",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:4444",
        "http://127.0.0.1:4444",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
// server.use(cookieParser('dev test change later')); //used to sign a cookie, so move to env
server.use(session({
    secret: 'dev test change later', //used to sign a cookie, so move to env
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}));

// server.use('/files', express.static(path.resolve("/services/files-storage")));
// server.use('/avatars', express.static(path.resolve("/services/files-storage/avatars")));

server.use("/api", routes);
server.use(ApiErrorMiddleware);


(async () => {
    //set data to memory (should use Redis for this in later versions)
    await DB.connect();

    app = server.listen(PORT, async () => {
        console.info(`App is listening on ${PORT}`);
    });

    if (process.env.NODE_ENV !== 'develop') {
        process.send('ready');
    }
})();

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
});

process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
});