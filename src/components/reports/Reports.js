import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Outlet is used for nested routes

const Reports = () => {
    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div style={{
                width: '200px',
                height: '100vh',
                background: '#f4f4f4',
                padding: '10px',
                borderRight: '2px solid #ddd'
            }}>
                <h3>Available Reports</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li><Link to="master-list-of-books">Master List of Books</Link></li>
                    <li><Link to="master-list-of-movies">Master List of Movies</Link></li>
                    <li><Link to="master-list-of-memberships">Master List of Memberships</Link></li>
                    <li><Link to="active-issues">Active Issues</Link></li>
                    <li><Link to="overdue-returns">Overdue Returns</Link></li>
                    <li><Link to="pending-issue-requests">Pending Issue Requests</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <h2>Reports</h2>
                <Outlet /> {/* This will render the nested routes */}
            </div>
        </div>
    );
};

export default Reports;
