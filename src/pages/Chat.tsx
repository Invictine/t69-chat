import React, { useState } from 'react';
import { Box, Drawer, CssBaseline } from '@mui/material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import ChatInput from '../components/chat/ChatInput';
import MessageList from '../components/chat/MessageList';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import { useChatContext } from '../context/ChatContext';

const drawerWidth = 260;

const Chat: React.FC<{ handleLogin: () => void }> = ({ handleLogin }) => {
  const { isEmptyChat } = useChatContext();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  console.log("Chat component rendering, isEmptyChat:", isEmptyChat);
  console.log("Current conversation:", useChatContext().conversations[useChatContext().currentConv]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box display="flex" height="100vh" width="100vw" sx={{ '--bg-dark': '#18181b' } as any}>
      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        variant="persistent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
            height: "100vh",
            backgroundColor: "#191927",
          },
        }}
      >
        <Sidebar handleLogin={handleLogin} />
      </Drawer>

      {/* Main Content */}
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        height="100vh"
        sx={{
          marginLeft: drawerOpen ? 0 : `-${drawerWidth}px`,
          overflow: "hidden",
          backgroundColor: "#18181b",
          transition: "margin-left 0.3s",
        }}
      >
        <Header toggleDrawer={toggleDrawer} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <Box flex={1} overflow="auto" display="flex" flexDirection="column">
          {isEmptyChat ? <WelcomeScreen /> : <MessageList />}
        </Box>

        <Footer />
        <ChatInput />
      </Box>
    </Box>
  );
};

export default Chat;