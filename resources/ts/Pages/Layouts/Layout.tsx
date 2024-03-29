import React, { ReactNode } from 'react';
import { Outlet,Link } from 'react-router-dom';
import { useRole } from '../../UserContext';
import USER_ROLE from "../../const"

const Layout: React.FC = () => {
    const { role, logout } = useRole();

    const handleLogout = () => {
        logout();
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '10px' }}>
                <h3>Menu</h3>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><Link onClick={handleLogout} to="/logout" className="link-dark d-inline-flex text-decoration-none rounded">Logout</Link></li>
                    {role === USER_ROLE.admin && <li><Link to="/crud/user" className="link-dark d-inline-flex text-decoration-none rounded">User</Link></li>}
                    {role === USER_ROLE.admin && <li><Link to="/crud/a_master" className="link-dark d-inline-flex text-decoration-none rounded">A_master</Link></li>}
                    {role === USER_ROLE.user && <li><Link to="/crud/b_master" className="link-dark d-inline-flex text-decoration-none rounded">B_master</Link></li>}
                </ul>
            </div>

            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;