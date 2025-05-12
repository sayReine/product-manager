import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/styles/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.userType;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className='navbar' style={{ display: 'flex', gap: '20px', padding: '10px', background: '#f0f0f0' }}>
      {!user ? (
        <>
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>

          {role === 'Owner' && (
            <>
              <Link to="/product">Products</Link>
              <Link to="/stockin">Stock In</Link>
            </>
          )}

          {(role === 'Owner' || role === 'Worker') && (
            <>
              <Link to="/stockout">Stock Out</Link>
              <Link to="/report">Report</Link>
            </>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
