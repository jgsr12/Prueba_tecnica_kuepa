import React, { useState } from 'react';
import api from '../../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'student',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      alert(response.data.message || 'Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (err) {
      alert('Error al registrar: ' + (err.response?.data?.message || 'Error desconocido'));
    }
  };

  return (
    <form onSubmit={handleRegister} className="container mt-5">
      <h2>Registrarse</h2>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        className="form-control my-2"
        placeholder="Usuario"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        className="form-control my-2"
        placeholder="Contraseña"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <select
        className="form-control my-2"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="student">Estudiante</option>
        <option value="moderator">Moderador</option>
      </select>
      <button type="submit" className="btn btn-primary">Registrar</button>
    </form>
  );
};

export default Register;
