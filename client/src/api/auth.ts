import { get, post } from './apiService';

export const getUser = () => get('/auth/user');

export const loginUser = (credentials) => post('/auth/login', credentials);

export const registerUser = (credentials) => post('/auth/register', credentials);

export const logoutUser = () => post('/auth/logout');
