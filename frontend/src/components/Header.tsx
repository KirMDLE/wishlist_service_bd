import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Wishlist App</Link>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="mr-4">Profile</Link>
            <button onClick={handleLogout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;