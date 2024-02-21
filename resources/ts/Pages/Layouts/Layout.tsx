import React from 'react';
import { Outlet,Link } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '10px' }}>
                <h3>Menu</h3>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><Link to="/logout" className="link-dark d-inline-flex text-decoration-none rounded">Logout</Link></li>
                    <li><Link to="/crud/dashboard" className="link-dark d-inline-flex text-decoration-none rounded">Dashboard</Link></li>
                </ul>
            </div>

            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;