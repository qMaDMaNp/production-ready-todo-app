import { get, post, put, del } from './apiService';

export const getTodoLists = () => get('/todo-lists');

export const getTodoList = (listId) => get(`/todo-lists/${listId}`);

export const createTodoList = (listData) => post('/todo-lists', listData);

export const updateTodoList = (listId, listData) => put(`/todo-lists/${listId}`, listData);

export const removeTodoList = (listId) => del(`/todo-lists/${listId}`);


export const getTodoListItems = () => get('/auth/user');

export const getTodoListItem = () => get('/auth/user');

export const createTodoListItem = (listItemData) => post('/auth/login', listItemData);

export const updateTodoListItem = (listItemData) => put('/auth/login', listItemData);

export const removeTodoListItem = (listItemId) => del('/auth/login', listItemId);
