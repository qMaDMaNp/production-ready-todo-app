import { Request, RequestHandler, Response } from 'express';
import TodoListItemService from '@services/TodoListItemService';

export async function show(req, res) {
  try {
    const todoLists = await TodoListItemService.getAll(req.todoListId);

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
    const todoList = await TodoListItemService.getTodoListItem(req.params.id);

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
    const name = req.body.name.trim();
    const color = req.body.color;

    const todoList = await TodoListItemService.createTodoListItem(name, req.user.id, color);

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