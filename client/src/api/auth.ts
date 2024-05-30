import axios, { AxiosResponse } from 'axios';

import { AuthResponse } from '../interfaces/responses/AuthResponse';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const API_URL = 'http://localhost:4444/api';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(useInRequest);

function useInRequest(config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
};

const addCredentials = (accessToken, user) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
};

const authErrorHandler = async (err) => {
    const url = `${API_URL}/refresh`;
    const originalRequest = err.config;

    if (err.response.status == 401 && err.config && !err.config._isRetry) {
        originalRequest._isRetry = true;

        try {
            const res = await axios.get(url, { withCredentials: true });

            addCredentials(res.data.accessToken, res.data.user);

            return axiosInstance.request(originalRequest);
        }
        catch (e) {
            console.error('NOT AUTHORIZED', e);
        }
    }

    throw err;
};

export const checkAuth = async () => {
    try {
        const res = await axios.get(
            `${API_URL}/refresh`,
            { withCredentials: true }
        );

        addCredentials(res.data.accessToken, res.data.user);
    }
    catch (e) {
        console.error(e);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }
};

export function addInterceptorErrorHandling() {
    axiosInstance.interceptors.response.use((config) => config, authErrorHandler);
};

export async function login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return axiosInstance.post('/login', { email, password })
};

export async function register(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return axiosInstance.post('/register', { email, password })
};

export async function logout(): Promise<void> {
    return axiosInstance.post('/logout')
};

export default axiosInstance;
