import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen: React.FC = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      height="100vh" 
      width="100vw" 
      alignItems="center" 
      justifyContent="center"
      sx={{ backgroundColor: "#18181b" }}
    >
      <CircularProgress 
        size={40} 
        sx={{ 
          color: "#7a0046",
          mb: 3
        }} 
      />
      <Typography 
        variant="h6" 
        sx={{ 
          color: "#fff",
          mb: 1
        }}
      >
        Loading T69 Chat
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: "#9ca3af",
          textAlign: "center"
        }}
      >
        Initializing authentication...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
