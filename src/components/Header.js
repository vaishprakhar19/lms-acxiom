import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './transactions/Transactions.css';

const Header = () => {
    const navigate = useNavigate();

    // State to store user information
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {}; // Default to an empty object
    });

    // Update user state when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem('user');
            setUser(storedUser ? JSON.parse(storedUser) : {});
        };

        // Add a listener for localStorage changes
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Handle logout by clearing localStorage and redirecting to home
    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data
        setUser({}); // Update state to reflect logged-out state
        navigate('/'); // Redirect to home page
    };

    return (
        <header className="navbar">
            <div className="navbar-brand">
                <button onClick={() => navigate('/')} className="logo">
                    Library Management System
                </button>
            </div>
            <nav className="navbar-links">
                {user.isAdmin !== undefined && (
                    <>
                        <button onClick={() => navigate(user.isAdmin ? '/admin/home' : '/user/home')}>
                            Home
                        </button>
                        <button onClick={() => navigate('/transactions')}>Transactions</button>
                        <button onClick={() => navigate('/reports')}>Reports</button>
                        {user.isAdmin && (
                            <button onClick={() => navigate('/maintenance')}>Maintenance</button>
                        )}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
