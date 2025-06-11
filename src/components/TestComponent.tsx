import React from 'react';
import { Box, Typography } from '@mui/material';

const TestComponent: React.FC = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column"
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      backgroundColor="#18181b"
      color="white"
    >
      <Typography variant="h2">Test Component Works!</Typography>
      <Typography variant="body1" mt={2}>
        If you can see this, your React setup is working correctly.
      </Typography>
    </Box>
  );
};

export default TestComponent;