import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface LoginProps {
  handleBackToChat: () => void;
}

const Login: React.FC<LoginProps> = ({ handleBackToChat }) => {
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
      <Box 
        display="flex" 
        alignItems="center" 
        mb={2} 
        sx={{ position: "absolute", top: 24, left: 24, cursor: "pointer" }}
        onClick={handleBackToChat}
      >
        <ArrowBack sx={{ mr: 1, fontSize: 20 }} />
        <Typography variant="body2">Back to Chat</Typography>
      </Box>
      
      <Typography variant="h4" mb={2}>Welcome to T69 Chat</Typography>
      <Typography variant="body2" mb={4} color="textSecondary">
        Sign in below (we'll increase your message limits if you do 😉)
      </Typography>
      
      <Button 
        variant="contained" 
        sx={{ 
          backgroundColor: "#640033",
          borderRadius: 1, 
          py: 1.5, 
          width: 350,
          mb: 3
        }}
      >
        Continue with Google
      </Button>
      
      <Typography variant="body2" color="textSecondary">
        By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
      </Typography>
    </Box>
  );
};

export default Login;