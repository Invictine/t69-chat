import React from 'react';
import { Box, Typography } from '@mui/material';
import { SignIn } from '@clerk/clerk-react';

const Login: React.FC = () => {
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
      <Typography 
        variant="h4" 
        mb={4} 
        sx={{ color: "#fff", textAlign: "center" }}
      >
        Welcome to T69 Chat
      </Typography>
      
      <Typography 
        variant="body1" 
        mb={4} 
        color="textSecondary"
        sx={{ textAlign: "center", maxWidth: "400px" }}
      >
        Sign in to start chatting with AI models like GPT-4 and Gemini
      </Typography>
      
      <Box sx={{ 
        '& .cl-card': { 
          backgroundColor: '#1e1e23',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px'
        },
        '& .cl-formButtonPrimary': {
          backgroundColor: '#7a0046',
          '&:hover': {
            backgroundColor: '#640033'
          }
        }
      }}>
        <SignIn 
          appearance={{
            elements: {
              card: "bg-gray-900 border border-gray-700",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-gray-800 border-gray-600 text-white hover:bg-gray-700",
              formFieldInput: "bg-gray-800 border-gray-600 text-white",
              formFieldLabel: "text-gray-300",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
              footerActionLink: "text-purple-400 hover:text-purple-300"
            }
          }}
        />
      </Box>
        <Typography 
        variant="body2" 
        color="textSecondary" 
        sx={{ mt: 4, textAlign: "center" }}
      >
        By continuing, you agree to our <a href="#" style={{ color: "#9ca3af" }}>Terms of Service</a> and <a href="#" style={{ color: "#9ca3af" }}>Privacy Policy</a>
      </Typography>
    </Box>
  );
};

export default Login;