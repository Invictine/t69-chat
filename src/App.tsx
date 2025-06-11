import React, { useState } from 'react';
import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from './styles/theme';
import { ChatProvider } from './context/ChatContext';
import Chat from './pages/Chat';
import Login from './pages/Login';

const App: React.FC = () => {
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  
  const handleLogin = () => {
    setShowLoginScreen(true);
  };
  
  const handleBackToChat = () => {
    setShowLoginScreen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ChatProvider>
        {showLoginScreen ? (
          <Login handleBackToChat={handleBackToChat} />
        ) : (
          <Chat handleLogin={handleLogin} />
        )}
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;