// src/components/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Card, CardContent, Typography, MenuItem, Alert } from '@mui/material';
import api from '../../utils/api';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      alert(response.data.message || 'Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (err) {
      setError('apiError', { message: err.response?.data?.message || 'Error desconocido' });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card sx={{ width: 400, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Registrarse
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('name', { required: 'El nombre es obligatorio' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
              {...register('password', { 
                required: 'La contraseña es obligatoria', 
                minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } 
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              select
              label="Rol"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue="student"
              {...register('role', { required: 'Selecciona un rol' })}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value="student">Estudiante</MenuItem>
              <MenuItem value="moderator">Moderador</MenuItem>
            </TextField>
            {errors.apiError && <Alert severity="error" sx={{ mt: 2 }}>{errors.apiError.message}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Registrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
