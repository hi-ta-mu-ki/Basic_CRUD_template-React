import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Layout from './Pages/Layouts/Layout';
import UserList from './Pages/Auth/List';
import A_MasterList from './Pages/A_master/List';
import B_MasterList from './Pages/B_master/List';
import { useRole } from './UserContext';
import USER_ROLE from "./const"

const App: React.FC = () => {
    const isAuthenticated = true; // ログイン状態に応じて変更
    const { role } = useRole();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/crud/*"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated} requiredRoles={[5, 10]} role={role}>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route
                                        path="/user"
                                        element={role === USER_ROLE.admin ? <UserList /> : <Navigate to="/" />}
                                    />
                                    <Route
                                        path="/a_master"
                                        element={role === USER_ROLE.admin ? <A_MasterList /> : <Navigate to="/" />}
                                    />
                                    <Route
                                        path="/b_master"
                                        element={role === USER_ROLE.user ? <B_MasterList /> : <Navigate to="/" />}
                                    />
                                </Route>
                            </Routes>
                        </PrivateRoute>
                    }
                />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

interface PrivateRouteProps {
    isAuthenticated: boolean;
    requiredRoles: number[];
    role: number;
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, requiredRoles, role, children }) => {
    const hasSufficientRole = requiredRoles.includes(role);
    return isAuthenticated && hasSufficientRole ? <>{children}</> : <Navigate to="/" />;
};

export default App;