import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from '@providers/auth/AuthProvider';

import HomePage from '@views/pages/main/home/HomePage';
import DashboardPage from '@views/pages/admin/dashboard/DashboardPage';

export default function AppLayout() {
    const { isAuth } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<HomePage />} />

                {isAuth ? (
                    <Route path="/dashboard" exact element={<DashboardPage />} />
                ) : (
                    <Route path="/dashboard" element={<Navigate to="/" replace />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}