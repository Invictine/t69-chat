import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import ChatInput from '../components/chat/ChatInput';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import MessageList from '../components/chat/MessageList';
import { useChatContext } from '../context/ChatContext';

const Chat: React.FC = () => {
  const { isEmptyChat } = useChatContext();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  
  useEffect(() => {
    const savedState = localStorage.getItem('t69_sidebar_visible');
    if (savedState !== null) {
      setSidebarVisible(savedState === 'true');
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('t69_sidebar_visible', sidebarVisible.toString());
  }, [sidebarVisible]);
  
  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar isVisible={sidebarVisible} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#221D27",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Header 
          sidebarVisible={sidebarVisible} 
          onToggleSidebar={toggleSidebar} 
        />
        
        {/* Chat content area */}
        <Box sx={{ 
          flexGrow: 1,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          {isEmptyChat ? <WelcomeScreen /> : <MessageList />}
          
          {/* ChatInput */}
          <ChatInput />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;