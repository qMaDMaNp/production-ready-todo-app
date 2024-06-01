import { Request, RequestHandler, Response } from 'express';
import TodoListItemService from '@services/TodoListItemService';

export async function show(req, res) {
  try {
    const todoListId = req.todoListId;

    const todoLists = await TodoListItemService.getAll(todoListId);

    if (!todoLists || todoLists.length === 0) {
      return res.status(404).send('No todoLists found for user');
    }

    res.status(200).json(todoLists);
  }
  catch (e) {
    res.status(500).send(e);
  }
};

export async function showOne(req: Request, res: Response) {
  try {
    const todoListItemId = req.params.id;

    const todoList = await TodoListItemService.getTodoListItem(todoListItemId);

    if (!todoList) {
      return res.status(404).send('TodoList not found');
    }

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
};

export async function create(req, res) {
  try {
    const userId = req.user.id;

    const name = req.body.name.trim();
    const color = req.body.color;

    const todoList = await TodoListItemService.createTodoListItem(name, userId, color);

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export async function update(req, res) {
  try {
    const todoListItemId = req.params.id;
    const name = req.body.name;
    const color = req.body.color;

    const todoList = await TodoListItemService.updateTodoListItem(todoListItemId, name, color);

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export async function remove(req, res) {
  try {
    const todoListItemId = req.params.id;

    await TodoListItemService.removeTodoListItem(todoListItemId);

    res.status(200).send('TodoList has been removed');
  }
  catch (e) {
    res.status(500).send(e);
  }
}