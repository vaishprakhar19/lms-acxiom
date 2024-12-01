import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Maintenance.css'; // For sidebar styles

const Maintenance = () => {
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
        <h2>Maintenance</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="membership/add">Membership</Link>
            <ul>
              <li><Link to="membership/add">Add</Link></li>
              <li><Link to="membership/update">Update</Link></li>
            </ul>
          </li>
          <li>
            <Link to="books-movies/add">Books/Movies</Link>
            <ul>
              <li><Link to="books-movies/add">Add</Link></li>
              <li><Link to="books-movies/update">Update</Link></li>
            </ul>
          </li>
          <li>
            <Link to="user-management">User Management</Link>
          </li>
        </ul>
      </div>
      <div className="main-content" style={{ flex: 1, padding: '20px' }}>
        <h2>Maintenance Page</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Maintenance;
