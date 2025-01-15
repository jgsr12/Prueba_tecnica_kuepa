import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/Chat';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setLoggedIn(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={loggedIn ? "/chat" : "/login"} />} />
        <Route path="/login" element={!loggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/chat" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={loggedIn ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
