import React from 'react';
import { Box, Button, Typography, ListItemButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useChatContext } from '../../context/ChatContext';
import UserMenu from '../user/UserMenu';

const Sidebar: React.FC = () => {
  const { 
    conversations, 
    currentConv, 
    setCurrentConv, 
    handleNewConversation 
  } = useChatContext();

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#0e0c15",
        width: "240px"
      }}
    >
      <Box p={2} pb={1.5} display="flex" flexDirection="column" height="100%">
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleNewConversation} 
          sx={{
            backgroundColor: "#7a0046",
            color: "white",
            borderRadius: "6px",
            textTransform: "none",
            fontWeight: 500,
            padding: "10px 16px",
            mb: 2,
            "&:hover": {
              backgroundColor: "#640033",
            }
          }}
        >
          New Chat
        </Button>
        
        <Box 
          sx={{
            backgroundColor: "#1e1c2e",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            px: 1.5,
            py: 1,
            mb: 2
          }}
        >
          <Search sx={{ color: "#9ca3af", fontSize: 18, mr: 1 }} />
          <input
            placeholder="Search your threads..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#9ca3af",
              fontSize: "0.875rem",
              width: "100%",
            }}
          />
        </Box>
        
        <Typography variant="caption" sx={{ color: "#8b8b8b", px: 1, mb: 1, fontSize: "0.7rem" }}>
          Today
        </Typography>
        
        <Box flex={1} sx={{ overflowY: "auto" }}>
          {conversations.map((conv, index) => (
            <ListItemButton
              key={index}
              selected={index === currentConv}
              onClick={() => setCurrentConv(index)}
              sx={{ 
                borderRadius: "4px",
                py: 0.75,
                px: 1.5,
                mb: 0.5,
                backgroundColor: index === currentConv ? "rgba(255, 255, 255, 0.08)" : "transparent",
                "&:hover": {
                  backgroundColor: index === currentConv ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.04)"
                }
              }}
            >
              <Typography 
                noWrap 
                sx={{ 
                  fontSize: "0.875rem", 
                  color: index === currentConv ? "#ffffff" : "#9ca3af"
                }}
              >
                {conv.title}
              </Typography>
            </ListItemButton>
          ))}        </Box>        {/* User section with custom UserMenu */}
        <Box sx={{ 
          px: 1.5,
          py: 1,
          mt: 1,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <UserMenu />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;