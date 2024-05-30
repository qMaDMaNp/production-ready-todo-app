//@ts-nocheck
import { createContext, useState, useEffect } from "react";

import {
    addInterceptorErrorHandling,

    login as loginRequest,
    logout as logoutRequest,
    register as registerRequest,
    checkAuth as checkAuthRequest,
} from "../api/auth";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');

    const isAuth = accessToken.length > 0 && Object.keys(user).length > 0;

    useEffect(() => {
        addInterceptorErrorHandling();

        if (localStorage.getItem('accessToken')) checkAuthRequest();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const res = await loginRequest(email, password);

            addCredentials(res.data.accessToken, res.data.user);

            window.location.reload();
        } catch (e) {
            console.error(e.res?.data?.message);
            throw (e);
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const res = await registerRequest(email, password);

            addCredentials(res.data.accessToken, res.data.user);

            window.location.reload();
        }
        catch (e) {
            console.error(e.res?.data?.message);
            throw (e);
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();

            removeCredentials();

            window.location.reload();
        }
        catch (e) {
            console.error(e);
        }
    };

    const addCredentials = (accessToken, user, updateInterface = false) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));

        if (updateInterface) {
            setAccessToken(accessToken);
            setUser(user);
        }
    };

    const removeCredentials = (updateInterface = false) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        if (updateInterface) {
            setAccessToken('');
            setUser({});
        }
    };

    const sharedValues = {
        user,
        isAuth,

        login,
        logout,
        register,
        checkAuthRequest
    };

    return (
        <AuthContext.Provider value={sharedValues}>
            {children}
        </AuthContext.Provider>
    );
}