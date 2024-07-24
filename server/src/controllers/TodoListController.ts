import { Request, Response } from 'express';
import TodoListService from '@services/TodoListService';
import TodoListItemService from '@services/TodoListItemService';

export async function show(req, res) {
  try {
    const todoLists = await TodoListService.getAll({ userId: req.user.id });
    res.status(200).json([todoLists]);
  }
  catch (e) {
    res.status(500).send(e);
  }
};

export async function showOne(req, res) {
  try {
    const todoList = await TodoListService.getOne({ 
      userId: req.user.id,
      todoListId: req.params.id 
    });

    if (!todoList) return res.status(404).send('TodoList not found');

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
};

export async function showItems(req, res) {
  try {
    const todoListItems = await TodoListItemService.getAll({ 
      userId: req.user.id,
      todoListId: req.params.id 
    });
    res.status(200).json(todoListItems);
  }
  catch (e) {
    res.status(500).send(e);
  }
};

export async function create(req, res) {
  try {
    const name = req.body.name.trim();
    const color = req.body.color || '';

    const todoList = await TodoListService.create({ 
      userId: req.user.id, 
      name, 
      color
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
    const color = req.body.color || '';

    const todoList = await TodoListService.update({
      userId: req.user.id, 
      todoListId: req.params.id,
      name, 
      color
    });

    res.status(200).json(todoList);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export async function remove(req, res) {
  try {
    await TodoListService.remove({
      userId: req.user.id, 
      todoListId: req.params.id,
    });

    res.status(200).send();
  }
  catch (e) {
    res.status(500).send(e);
  }
}