import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { LightMode, DarkMode, Settings, Menu as MenuIcon } from '@mui/icons-material';

interface HeaderProps {
  toggleDrawer: () => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer, toggleDarkMode, darkMode }) => {
  return (
    <Box className="header" sx={{ 
      backgroundColor: "#18181b", 
      borderBottom: "1px solid #2a2a3a",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <IconButton onClick={toggleDrawer} sx={{ color: "#9ca3af" }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">T69 Chat</Typography>
        <Box>
          <IconButton onClick={toggleDarkMode} sx={{ color: "#9ca3af" }}>
            {darkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </IconButton>
          <IconButton sx={{ color: "#9ca3af" }}>
            <Settings fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;