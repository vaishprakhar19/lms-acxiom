import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Outlet is used for nested routes

const Reports = () => {
    return (
        <div  className='container'>
            {/* Sidebar */}
            <div className='sidebar'>
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
            <div className='content'>
                <h1>Reports</h1>
                <Outlet /> {/* This will render the nested routes */}
            </div>
        </div>
    );
};

export default Reports;
