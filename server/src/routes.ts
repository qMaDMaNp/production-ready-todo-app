import { Router } from 'express';
import passport from 'passport';

import AuthMiddleware from '@middlewares/authMiddleware';

import * as UserController from '@controllers/UserController';
import * as AuthController from '@controllers/AuthController';

import * as TodoListController from '@controllers/TodoListController';
import * as TodoListItemController from '@controllers/TodoListItemController';


const router = Router();

router.get("/ping", (req, res) => {
    //@ts-ignore
    console.log(req.session, req.session.id);
    //@ts-ignore
    req.session.visited = true;

    res.status(200).json({ response: "pong" })
});

const userList = [
    { id: 1, username: 'pewpew', password: 'passwordBebe' },
    { id: 2, username: 'pewpew1', password: 'passwordBebe1' },
    { id: 3, username: 'pewpew2', password: 'passwordBebe2' }
];

router.post("/auth", passport.authenticate('local'),  (req, res) => {
    res.status(200).send('ok');
});


router.get("/auth/status", (req, res) => {
    req.user
        ? res.status(200).send(req.user)
        : res.status(401).send({ msg: 'Bad Credentials' });
});


router.post("/auth/logout", (req, res) => {
	if (!req.user) return res.sendStatus(401);
console.log(req.logout);
	req.logout((e) => {
		if (e) return res.sendStatus(400);
		res.send(200);
	});
});













//TodoLists
router.get('/todo-lists', AuthMiddleware.authMiddleware, TodoListController.show);
router.get('/todo-lists/:id', AuthMiddleware.authMiddleware, TodoListController.showOne);

router.post('/todo-lists', AuthMiddleware.authMiddleware, TodoListController.create);
router.put('/todo-lists/:id', AuthMiddleware.authMiddleware, TodoListController.update);
router.delete('/todo-lists/:id', AuthMiddleware.authMiddleware, TodoListController.remove);

//TodoListItems
router.get('/todo-list-items', AuthMiddleware.authMiddleware, TodoListItemController.show);
router.get('/todo-list-items/:id', AuthMiddleware.authMiddleware, TodoListItemController.showOne);

router.post('/todo-list-items', AuthMiddleware.authMiddleware, TodoListItemController.create);
router.put('/todo-list-items/:id', AuthMiddleware.authMiddleware, TodoListItemController.update);
router.delete('/todo-list-items/:id', AuthMiddleware.authMiddleware, TodoListItemController.remove);

//Auth
router.post('/login', AuthController.login);
router.post('/register', AuthMiddleware.registerMiddleware, AuthController.registration);
router.post('/logout', AuthController.logout);

//Users
router.get('/users', AuthMiddleware.authMiddleware, UserController.getUsers);
router.get('/users/:id', UserController.getUser);

router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);

router.get('/version', (req, res) => {
    res.send('0.0.1')
});

export default router;
