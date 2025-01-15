import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para navegación
import api from '../../utils/api';
import { setAuthToken } from '../../utils/auth';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      setAuthToken(response.data.token);
      onLogin(); // Llamar al padre para redirigir
    } catch (err) {
      alert('Error al iniciar sesión: ' + err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control my-2"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Ingresar</button>
      
      <div className="mt-3">
        <p>¿No tienes una cuenta?</p>
        <Link to="/register" className="btn btn-secondary">Registrarse</Link>
      </div>
    </form>
  );
};

export default Login;
