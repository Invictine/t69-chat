import React from 'react';
import { Box, Typography } from '@mui/material';

const ApiKeysTab: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        API Keys
      </Typography>
      <Typography variant="body1" sx={{ color: '#9ca3af' }}>
        API key management will be implemented soon.
      </Typography>
    </Box>
  );
};

export default ApiKeysTab;