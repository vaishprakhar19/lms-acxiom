import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Transactions.css';

const Transactions = () => {
    return (
        <div className="transactions-container">
            <aside className="sidebar" style={{
                width: '200px',
                height: '100vh',
                background: '#f4f4f4',
                padding: '10px',
                borderRight: '2px solid #ddd'
            }}>
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
