import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    // Check if the user is an admin by reading from localStorage
    const isAdmin = localStorage.getItem('isAdmin');

    // Handle logout by clearing localStorage and redirecting to home
    const handleLogout = () => {
        localStorage.removeItem('isAdmin');  // Remove isAdmin status
        localStorage.removeItem('authToken');  // Remove auth token if used
        navigate('/');  // Redirect to home page
    };

    // Render home link based on user type
    const renderHomeLink = () => {
        if (isAdmin === 'true') {
            return <button onClick={() => navigate('/admin/home')}>Home</button>;
        } else if (isAdmin === 'false') {
            return <button onClick={() => navigate('/user/home')}>Home</button>;
        }
        return null; // If no login, do not show the home button
    };

    return (
        <header>
            <nav>
                {/* Render Home based on isAdmin value */}
                {renderHomeLink()}

                {/* Show additional links if user is logged in */}
                {isAdmin !== null && (
                    <>
                        <button onClick={() => navigate('/transactions')}>Transactions</button>
                        <button onClick={() => navigate('/reports')}>Reports</button>
                        {isAdmin === 'true' && (
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
