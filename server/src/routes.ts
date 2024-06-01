import { Router } from 'express';

import AuthMiddleware from '@middlewares/authMiddleware';

import * as UserController from '@controllers/UserController';
import * as AuthController from '@controllers/AuthController';

import * as TodoListController from '@controllers/TodoListController';
import * as TodoListItemController from '@controllers/TodoListItemController';

const router = Router();

router.get("/ping", (req, res) => res.status(200).json({ response: "pong" }));

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
