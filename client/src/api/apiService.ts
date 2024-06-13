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
  refreshSubscribers.map((callback) => callback(token));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Add auth token to request headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
},
  error => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  async error => {
    const {
      config: originalRequest,
      response
    } = error;

    if (response) {
      // Handle errors based on status code
      const { status } = response;

      if (status === 401) {
        // Unauthorized access, handle logout or token refresh
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, { refreshToken }, { withCredentials: true });

            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);

            isRefreshing = false;
            onRefreshed(data.token);
          } 
          catch (err) {
            isRefreshing = false;
            refreshSubscribers = [];

            window.location.reload();

            return Promise.reject(err);
          }
        }

        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
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


const get = (url, params = {}) => {
  return api.get(url, { params });
};

const post = (url, data = {}) => {
  return api.post(url, data);
};

const put = (url, data) => {
  return api.put(url, data);
};

const del = (url) => {
  return api.delete(url);
};


export {
  get,
  post,
  put,
  del
};
