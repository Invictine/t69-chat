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
          overflow: "hidden"
        }}
      >
        <Header />
        
        <Box sx={{ 
          flexGrow: 1, 
          overflow: "auto",
          pb: 10 // Add padding at bottom to accommodate the chat input
        }}>
          {isEmptyChat ? <WelcomeScreen /> : <MessageList />}
        </Box>
        
        <ChatInput />
      </Box>
    </Box>
  );
};

export default Chat;