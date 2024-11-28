import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/admin/login">Admin Login</Link> |{' '}
                <Link to="/user/login">User Login</Link>
            </nav>
        </header>
    );
};

export default Header;
