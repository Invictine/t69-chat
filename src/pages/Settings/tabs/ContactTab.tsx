import React from 'react';
import { Box, Typography } from '@mui/material';

const ContactTab: React.FC = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        We're here to help!
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2
      }}>
        {/* Feature idea */}
        <Box sx={{ 
          p: 3, 
          borderRadius: 2, 
          border: '1px solid rgba(39, 39, 42, 0.5)', 
          backgroundColor: 'rgba(24, 24, 27, 0.4)'
        }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
            <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>✨</Box>
            <Typography variant="h6" sx={{ color: '#d4d4d8' }}>
              Have a cool feature idea?
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#9ca3af', ml: 4 }}>
            Vote on upcoming features or suggest your own
          </Typography>
        </Box>
        
        {/* Bug report */}
        <Box sx={{ 
          p: 3, 
          borderRadius: 2, 
          border: '1px solid rgba(39, 39, 42, 0.5)', 
          backgroundColor: 'rgba(24, 24, 27, 0.4)'
        }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
            <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>🐛</Box>
            <Typography variant="h6" sx={{ color: '#d4d4d8' }}>
              Found a bug?
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#9ca3af', ml: 4 }}>
            Let us know so we can fix it ASAP
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ContactTab;