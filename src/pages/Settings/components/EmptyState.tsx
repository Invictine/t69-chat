import React from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, subMessage, icon }) => {
  return (
    <Box sx={{ 
      py: 4, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      color: '#9ca3af',
      backgroundColor: 'rgba(39, 39, 42, 0.3)',
      borderRadius: 1,
      padding: 3
    }}>
      {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}
      <Typography variant="body1" sx={{ mb: 1 }}>
        {message}
      </Typography>
      {subMessage && (
        <Typography variant="body2">
          {subMessage}
        </Typography>
      )}
    </Box>
  );
};

export default EmptyState;