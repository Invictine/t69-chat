import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { LightMode, Settings } from '@mui/icons-material';
import { useUser } from '@clerk/clerk-react';
import AuthStatus from '../auth/AuthStatus';

interface HeaderProps {
  toggleDarkMode?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const { user } = useUser();
  
  return (
    <Box 
      sx={{ 
        backgroundColor: "#121212", 
        borderBottom: "1px solid rgba(42, 42, 58, 0.6)",
        padding: "0px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
        width: "100%"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            fontSize: "1rem",
            color: "#fff"
          }}
        >
          T69
        </Typography>
        {user && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#9ca3af",
              fontSize: "0.875rem"
            }}
          >
            Welcome back, {user.firstName || 'User'}!
          </Typography>
        )}
      </Box>      
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AuthStatus />
        <IconButton sx={{ color: "#9ca3af" }}>
          <LightMode fontSize="small" />
        </IconButton>
        <IconButton sx={{ color: "#9ca3af", ml: 1 }}>
          <Settings fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;