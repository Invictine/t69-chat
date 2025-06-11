import React from 'react';
import { Box, Button, List, ListItem, ListItemText, ListSubheader, IconButton } from '@mui/material';
import { Search, Delete, Refresh } from '@mui/icons-material';
import { useChatContext } from '../../context/ChatContext';
import type { Conversation } from '../../context/ChatContext';

interface SidebarProps {
  handleLogin: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogin }) => {
  const { 
    conversations, 
    currentConv, 
    setCurrentConv, 
    handleNewConversation, 
    handleDeleteConversation 
  } = useChatContext();

  return (
    <Box p={2} display="flex" flexDirection="column" height="100%">
      <Box display="flex" alignItems="center" mb={2}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleNewConversation} 
          sx={{
            backgroundColor: "#7a0046",
            color: "white",
            borderRadius: "4px",
            textTransform: "none",
            fontWeight: 500,
            padding: "10px",
          }}
        >
          New Chat
        </Button>
      </Box>
      
      <Box 
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 1.5,
          display: "flex",
          alignItems: "center",
          px: 1.5,
          py: 0.5,
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
      
      <List 
        sx={{ 
          overflowY: "auto", 
          flex: 1,
          pb: 0
        }}
        subheader={
          <ListSubheader 
            component="div" 
            sx={{ 
              backgroundColor: "transparent", 
              color: "#9ca3af",
              fontSize: "0.75rem",
              pl: 2,
              py: 0.5
            }}
          >
            Today
          </ListSubheader>
        }
      >
        {conversations.map((conv, index) => (
          <Box 
            key={index} 
            sx={{ 
              position: 'relative',
              '&:hover .deleteButton': {
                opacity: 1
              }
            }}
          >
            <ListItem
              button
              selected={index === currentConv}
              onClick={() => setCurrentConv(index)}
              sx={{ 
                borderRadius: 1,
                py: 0.5,
                backgroundColor: index === currentConv ? "rgba(255, 255, 255, 0.1)" : "transparent",
                "&:hover": {
                  backgroundColor: index === currentConv ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"
                }
              }}
            >
              <ListItemText 
                primary={conv.title} 
                primaryTypographyProps={{ 
                  noWrap: true,
                  sx: { 
                    color: index === currentConv ? "#ffffff" : "#9ca3af",
                    fontSize: "0.9rem"
                  }
                }}
              />
            </ListItem>
            <IconButton 
              className="deleteButton"
              size="small"
              onClick={() => handleDeleteConversation(index)}
              sx={{ 
                position: 'absolute', 
                right: 8, 
                top: 4, 
                opacity: 0,
                color: '#9ca3af',
                '&:hover': { color: '#ff6b6b' }
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </List>
      
      <Box mt="auto" mb={2} display="flex" alignItems="center">
        <Button
          variant="text"
          onClick={handleLogin}
          sx={{ 
            color: "#9ca3af", 
            justifyContent: "flex-start", 
            textTransform: "none",
            fontSize: "0.9rem"
          }}
          startIcon={<Refresh fontSize="small" />}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;