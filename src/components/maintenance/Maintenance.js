import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Maintenance.css'; // For sidebar styles

const Maintenance = () => {
  return (
    <div className='container'>
            {/* Sidebar */}
            <div className='sidebar'>
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
      <div className="content" style={{ flex: 1, padding: '20px' }}>
        <h1>Maintenance</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Maintenance;
