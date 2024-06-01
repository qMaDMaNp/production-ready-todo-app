import { Request, RequestHandler, Response } from 'express';
import TodoListService from '@services/TodoListService';

export async function show(req, res) {
  try {
    const userId = req.user.id;

    const todoLists = await TodoListService.getAll(userId);

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
    const todoListId = req.params.id;

    const todoList = await TodoListService.getTodoList(todoListId);

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

    const todoList = await TodoListService.createTodoList(name, userId, color);

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export async function update(req, res) {
  try {
    const todoListId = req.params.id;
    const name = req.body.name;
    const color = req.body.color;

    const todoList = await TodoListService.updateTodoList(todoListId, name, color);

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export async function remove(req, res) {
  try {
    const todoListId = req.params.id;

    await TodoListService.removeTodoList(todoListId);

    res.status(200).send('TodoList has been removed');
  }
  catch (e) {
    res.status(500).send(e);
  }
}