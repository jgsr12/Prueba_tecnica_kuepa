import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import api from '../utils/api';

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
    // Cerrar sesión
    localStorage.removeItem('token');
    socket.disconnect();
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Chat</h2>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div className="chat-box" style={{ border: '1px solid #ccc', height: '400px', overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.User?.name || 'Desconocido'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-3">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="btn btn-primary">Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
