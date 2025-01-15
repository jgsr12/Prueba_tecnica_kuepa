import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Chat App</a>
        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
