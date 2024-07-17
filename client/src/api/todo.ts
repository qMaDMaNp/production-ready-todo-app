import { get, post, put, del } from './apiService';

export const getTodoLists = () => get('/todo-lists');

export const getTodoList = (listId) => get(`/todo-lists/${listId}`);

export const createTodoList = (listData) => post('/todo-lists', listData);

export const updateTodoList = (listId, listData) => put(`/todo-lists/${listId}`, listData);

export const removeTodoList = (listId) => del(`/todo-lists/${listId}`);


export const getTodoListItems = (listId) => get(`/todo-list-items/${listId}`);

export const getTodoListItem = (listItemId) => get(`/todo-list-items/${listItemId}`);

export const createTodoListItem = (listItemData) => post('/todo-list-items', listItemData);

export const updateTodoListItem = (listItemId, listItemData) => put(`/todo-lists/${listItemId}`, listItemData);

export const removeTodoListItem = (listItemId) => del(`/todo-list-items/${listItemId}`);
