import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Layout from './Pages/Layouts/Layout';
import Dashboard from './Pages/Layouts/Dashboard';

const App: React.FC = () => {
  const isAuthenticated = true; // ログイン状態に応じて変更

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/crud/*"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
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
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};


export default App;