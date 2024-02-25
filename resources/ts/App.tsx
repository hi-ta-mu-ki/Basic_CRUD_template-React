import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Layout from './Pages/Layouts/Layout';
import UserList from './Pages/Auth/List';
// import Edit from './Pages/Auth/Edit';
import A_MasterList from './Pages/A_master/List';
import B_MasterList from './Pages/B_master/List';

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
                                    <Route path="/user" element={<UserList />} />
                                    {/* <Route path="/edit/:id" element={<Edit />} /> */}
                                    <Route path="/a_master" element={<A_MasterList />} />
                                    <Route path="/b_master" element={<B_MasterList />} />
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