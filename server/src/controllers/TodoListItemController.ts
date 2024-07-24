import { Request, Response } from 'express';
import TodoListItemService from '@services/TodoListItemService';


export async function showOne(req: Request, res: Response) {
  try {
    const todoList = await TodoListItemService.getOne({
      userId: req.user.id,
      todoListItemId: req.params.id
    });

    if (!todoList) return res.status(404).send('TodoList not found');

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
};

export async function create(req, res) {
  try {
    const name = req.body.name.trim();

    const todoList = await TodoListItemService.create({
      userId: req.user.id, 
      todoListId: req.body.todoListId,
      name
    });

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export async function update(req, res) {
  try {
    const name = req.body.name;

    const todoList = await TodoListItemService.update({
      userId: req.user.id, 
      todoListItemId: req.params.id,
      name
    });

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export async function remove(req, res) {
  try {
    await TodoListItemService.remove({
      userId: req.user.id, 
      todoListItemId: req.params.id
    });

    res.status(200).send();
  }
  catch (e) {
    res.status(500).send(e);
  }
}