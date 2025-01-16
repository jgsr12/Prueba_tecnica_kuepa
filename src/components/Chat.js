import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import api from '../utils/api';
import { setAuthToken } from '../utils/auth';
import { AppBar, Toolbar, Typography, Button, TextField, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const socket = io(process.env.REACT_APP_API_URL.replace('/api', ''), {
    transports: ['websocket'],
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/chat', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error al obtener mensajes:', error.response?.data || error.message);
      }
    };

    fetchMessages();

    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await api.post(
        '/chat',
        { content: newMessage },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      socket.emit('message', response.data);
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  
    setAuthToken(null);
  
    if (socket.connected) {
      socket.disconnect();
    }
  
    navigate('/login');
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Chat
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Chat Box */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'calc(100vh - 64px)',
          padding: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        {/* Message List */}
        <Paper elevation={3} sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, marginBottom: 2 }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ marginBottom: 1 }}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" color="primary">
                      {msg.User?.name || 'Desconocido'}
                    </Typography>
                  }
                  secondary={msg.content}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Message Input */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
