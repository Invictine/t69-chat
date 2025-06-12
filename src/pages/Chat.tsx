import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import ChatInput from '../components/chat/ChatInput';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import MessageList from '../components/chat/MessageList';
import { useChatContext } from '../context/ChatContext';

const Chat: React.FC = () => {
  const { isEmptyChat } = useChatContext();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#221D27",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Header />
        
        {/* Chat content area - Takes most of the space */}
        <Box sx={{ 
          flexGrow: 1,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          {isEmptyChat ? <WelcomeScreen /> : <MessageList />}
          
          {/* ChatInput is positioned absolutely within this container */}
          <ChatInput />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;