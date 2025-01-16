// src/components/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { setAuthToken } from '../../utils/auth';

const Login = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      setAuthToken(response.data.token);
      onLogin();
    } catch (err) {
      setError('apiError', { message: err.response?.data?.message || 'Error al iniciar sesión' });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card sx={{ width: 400, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Usuario"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('username', { required: 'El usuario es obligatorio' })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('password', { required: 'La contraseña es obligatoria' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            {errors.apiError && <Alert severity="error" sx={{ mt: 2 }}>{errors.apiError.message}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Ingresar
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Registrarse
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
