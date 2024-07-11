import { createContext, useState, useEffect, useContext } from 'react';
import {
  getUser,
  loginUser,
  registerUser,
  logoutUser
} from '@api/auth';

import authHelper from '@lib/authHelper';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(authHelper.getUserStorageData() || null);
  const [getUserRequestInProgress, setGetUserRequestInProgress] = useState(false);
  const isAuth = !!(user && Object.keys(user).length);

  useEffect(() => {
    const getUserSession = async () => {
      setGetUserRequestInProgress(true);

      try {
        const res = await getUser();
        handleUserChange(res.data);
      }
      catch (err) {
        console.error('Error checking user session', err);
        setUser(null);
      }
      finally {
        setGetUserRequestInProgress(false);
      }
    };

    getUserSession();
  }, []);

  function handleUserChange(userData) {
    if (!userData) {
      authHelper.removeUserStorageData();
      setUser(null);
      return;
    }

    authHelper.setUserStorageData(JSON.stringify(userData));
    setUser(authHelper.getUserStorageData());
  }

  const login = async (credentials) => {
    try {
      console.log(credentials);
      const res = await loginUser(credentials);
      handleUserChange(res.data);
    }
    catch (err) {
      console.error('Error logging in', err);
      throw err;
    }
  };

  const register = async (credentials) => {
    try {
      const res = await registerUser(credentials);
      handleUserChange(res.data);
    }
    catch (err) {
      console.error('Error registering', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      authHelper.logoutUser();
    }
    catch (err) {
      console.error('Error logging out', err);
    }
  };

  const value = {
    user,
    getUserRequestInProgress,
    isAuth,

    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
