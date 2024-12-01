import React from 'react';
import { Link } from 'react-router-dom';
import "../components/transactions/Transactions.css"

const LoginPage = () => {
    return (
        <div className="page-container container">
            <Link to="/admin/login">Admin Login</Link>
            <span>|</span>
            <Link to="/user/login">User Login</Link>
        </div>
    );
};

export default LoginPage;
