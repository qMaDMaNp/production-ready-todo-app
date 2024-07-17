import { Router } from 'express';

import AuthMiddleware from '@middlewares/authMiddleware';
import loginRequestRule from '@middlewares/rules/loginRequestRule';
import registerRequestRule from '@middlewares/rules/registerRequestRule';

import * as AuthController from '@controllers/AuthController';
import * as TodoListController from '@controllers/TodoListController';
import * as TodoListItemController from '@controllers/TodoListItemController';


const router = Router();

router.get("/ping", (req, res) => res.status(200).json({ response: "pong" }));

//TodoLists
router.get('/todo-lists', AuthMiddleware.isUser, TodoListController.show);
router.get('/todo-lists/:id', AuthMiddleware.isUser, TodoListController.showOne);

router.post('/todo-lists', AuthMiddleware.isUser, TodoListController.create);
router.put('/todo-lists/:id', AuthMiddleware.isUser, TodoListController.update);
router.delete('/todo-lists/:id', AuthMiddleware.isUser, TodoListController.remove);

//TodoListItems
router.get('/todo-list-items/:listId', AuthMiddleware.isUser, TodoListItemController.show);
router.get('/todo-list-items/:listId/:id', AuthMiddleware.isUser, TodoListItemController.showOne);

router.post('/todo-list-items', AuthMiddleware.isUser, TodoListItemController.create);
router.put('/todo-list-items/:id', AuthMiddleware.isUser, TodoListItemController.update);
router.delete('/todo-list-items/:id', AuthMiddleware.isUser, TodoListItemController.remove);

//Auth
router.get('/auth/user', AuthController.getUser);
router.post('/auth/login', loginRequestRule, AuthController.login);
router.post('/auth/register', registerRequestRule, AuthController.register);
router.post('/auth/logout', AuthMiddleware.isUser, AuthController.logout);


router.get('/version', (req, res) => {
    res.send('0.0.1')
});

export default router;
