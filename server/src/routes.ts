import { Router } from 'express';

import AuthMiddleware from './middlewares/authMiddleware';

import * as UserController from './controllers/UserController';
import * as AuthController from './controllers/AuthController';

import * as WatchlistController from './controllers/WatchlistController';

const router = Router();

router.get("/ping", (req, res) => res.status(200).json({ response: "pong" }));

//Auth
router.post('/login', AuthController.login);
router.post('/register', AuthMiddleware.registerMiddleware, AuthController.registration);
router.post('/logout', AuthController.logout);

//Watchlists
router.get('/watchlists', AuthMiddleware.authMiddleware, WatchlistController.show);
router.get('/watchlists/:id', AuthMiddleware.authMiddleware, WatchlistController.showOne);
router.post('/watchlists', AuthMiddleware.authMiddleware, WatchlistController.create);
router.post('/watchlists/:id/item-add', AuthMiddleware.authMiddleware, WatchlistController.addItem);
router.post('/watchlists/:id/item-remove', AuthMiddleware.authMiddleware, WatchlistController.removeItem);
router.put('/watchlists/:id', AuthMiddleware.authMiddleware, WatchlistController.update);
router.delete('/watchlists/:id', AuthMiddleware.authMiddleware, WatchlistController.remove);

//Users
router.get('/users', AuthMiddleware.authMiddleware, UserController.getUsers);
router.get('/users/:id', UserController.getUser);

router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);

router.get('/version', (req, res) => {
    res.send('0.0.1')
});

export default router;
