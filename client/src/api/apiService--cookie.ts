import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4444/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  async error => {
    const { config: originalRequest, response } = error;

    if (response) {
      const { status } = response;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, {}, { withCredentials: true });
            
            isRefreshing = false;
            onRefreshed(data.token);

            //TODO: remove and leave the one on line 60?
            return api(originalRequest);
          } 
          catch (err) {
            isRefreshing = false;
            refreshSubscribers = [];

            // You can redirect to login
            // We've deleted cookies on serverver
            window.location.reload();

            return Promise.reject(err);
          }
        }

        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            resolve(api(originalRequest));
          });
        });
      } 
      else if (status === 403) {
        // Forbidden access
      }
      else if (status === 404) {
        // Resource not found
      }
      else if (status >= 500) {
        // Server error
      }
    }

    return Promise.reject(error);
  }
);

const get = (url, params = {}) => api.get(url, { params });
const post = (url, data = {}) => api.post(url, data);
const put = (url, data) => api.put(url, data);
const del = (url) => api.delete(url);

export { get, post, put, del };
