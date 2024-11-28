import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Transactions.css'; // Optional: Add some styling for the sidebar and content.

const Transactions = () => {
    return (
        <div className="transactions-container">
            <aside className="sidebar">
                <ul>
                    <li>
                        <Link to="is-book-available">Is Book Available</Link>
                    </li>
                    <li>
                        <Link to="issue-book">Issue Book</Link>
                    </li>
                    <li>
                        <Link to="return-book">Return Book</Link>
                    </li>
                    <li>
                        <Link to="pay-fine">Pay Fine</Link>
                    </li>
                </ul>
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default Transactions;
