import { Request, Response } from 'express';
import TodoListItemService from '@services/TodoListItemService';

export async function show(req, res) {
  try {
    const todoListItems = await TodoListItemService.getAll(req.user.id, req.params.todoListId);
    res.status(200).json(todoListItems);
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
    const color = req.body.color = '';

    const todoList = await TodoListItemService.createTodoListItem(name, req.user.id, color);

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}


export async function update(req, res) {
  try {
    const name = req.body.name;
    const color = req.body.color;

    const todoList = await TodoListItemService.updateTodoListItem(req.params.id, name, color);

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export async function remove(req, res) {
  try {
    await TodoListItemService.removeTodoListItem(req.params.id);

    res.status(200).send('TodoList has been removed');
  }
  catch (e) {
    res.status(500).send(e);
  }
}