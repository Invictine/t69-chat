import React from 'react';
import { Box, IconButton, Fade } from '@mui/material';
import { 
  LightMode,
  DarkMode,
  Settings,
  MenuOutlined,
  Search as SearchIcon, 
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  sidebarVisible?: boolean;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarVisible = true, onToggleSidebar }) => {
  const navigate = useNavigate();
  const { currentTheme, toggleTheme, themeOptions } = useTheme();
  
  const handleClick = () => {
    navigate('/settings?tab=customization');
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: "transparent", 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "55px",
        width: "100%",
        position: "relative", // Required for absolute positioning of ribbon
        
        overflow: "visible" // Allow the ribbon to extend outside
      }}
    >    
    <Box 
      sx={{ 
        visibility: sidebarVisible ? 'visible' : 'hidden',
        backgroundColor: themeOptions.background.header,
        display: "flex",
        height: "14px",
        width: "100%",
        position: "absolute",
        top: 0,
      }}
    >  
    </Box>
      {/* Left side - Show collapsed controls or title */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center",
        zIndex: 10, // Place above the ribbon
        ml: sidebarVisible ? 1 : 0, // Add margin when sidebar visible to account for ribbon
      }}>
        {!sidebarVisible && (
          <Fade in={!sidebarVisible}>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 0,
              backgroundColor: themeOptions.background.paper,
              borderRadius: "8px",
              padding: "2px",
              ml: 1, 
            }}>
              <IconButton 
                onClick={onToggleSidebar} 
                sx={{ 
                  color: themeOptions.text.secondary,
                  padding: "8px"
                }}
              >
                <MenuOutlined fontSize="small" />
              </IconButton>
              
              <IconButton 
                sx={{ 
                  color: themeOptions.text.secondary,
                  padding: "8px"
                }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
              
              <IconButton 
                sx={{ 
                  color: themeOptions.text.secondary,
                  padding: "8px"
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Fade>
        )}
      </Box>
      
      {/* Right side - Settings buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          backgroundColor: sidebarVisible ? themeOptions.background.header : themeOptions.background.paper,
          borderRadius: sidebarVisible ? "0 0 0 0px" : "8px",
          padding: "2px",
          zIndex: 10,
          position: "relative",
          height: "45px",
          mr: sidebarVisible ? 0 : 1,
          mt: sidebarVisible ? "0" : "5px",
          clipPath: sidebarVisible ? `path("M -90 0 C 76 0 10 45 55 45 L 170 50 L 170 0 Z")` : "none",
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            color: themeOptions.text.secondary,
            padding: "8px",
            ml: sidebarVisible ? "35px" : "0",
          }}
        >
          <Settings fontSize="small" />
        </IconButton>
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: themeOptions.text.secondary,
            padding: "8px",
            mr: sidebarVisible ? "10px" : "0",
          }}
        >
          {currentTheme === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;