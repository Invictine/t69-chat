import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      py={1}
      sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
    >
      <Typography variant="caption">
        Make sure you agree to our <a href="#" style={{ color: "#9ca3af" }}>Terms</a> and our <a href="#" style={{ color: "#9ca3af" }}>Privacy Policy</a>
      </Typography>
    </Box>
  );
};

export default Footer;