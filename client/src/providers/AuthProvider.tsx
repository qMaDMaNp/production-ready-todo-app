import { createContext, useState, useEffect, useContext } from 'react';
import { 
  getUser, 
  loginUser, 
  registerUser, 
  logoutUser 
} from '../api/auth';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [getUserRequestInProgress, setGetUserRequestInProgress] = useState(true);

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const res = await getUser();
        setUser(res.data.user);
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

  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      setUser(res.data.user);
    } 
    catch (err) {
      console.error('Error logging in', err);
      throw err;
    }
  };

  const register = async (credentials) => {
    try {
      const res = await registerUser(credentials);
      setUser(res.data.user);
    } 
    catch (err) {
      console.error('Error registering', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      window.location.reload();
    } 
    catch (err) {
      console.error('Error logging out', err);
    }
  };

  const value = {
    user,
    getUserRequestInProgress,

    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!getUserRequestInProgress && children}
    </AuthContext.Provider>
  );
};
