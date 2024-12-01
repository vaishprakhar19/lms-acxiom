import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    // Check if the user is an admin by reading from localStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {}; // Default to an empty object
    });

    // Handle logout by clearing localStorage and redirecting to home
    const handleLogout = () => {
        localStorage.removeItem('user');  // Remove user data
        navigate('/');  // Redirect to home page
    };

    // Render home link based on user type
    const renderHomeLink = () => {
        if (user.isAdmin === true) {
            return <button onClick={() => navigate('/admin/home')}>Home</button>;
        } else if (user.isAdmin === false) {
            return <button onClick={() => navigate('/user/home')}>Home</button>;
        }
        return null; // If no login, do not show the home button
    };

    return (
        <header>
            <nav>
                {/* Render Home based on user.isAdmin value */}
                {renderHomeLink()}

                {/* Show additional links if user is logged in */}
                {user.isAdmin !== undefined && (
                    <>
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
