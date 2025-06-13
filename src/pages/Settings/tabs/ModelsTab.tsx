import React from 'react';
import { Box, Typography } from '@mui/material';

const ModelsTab: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Model Settings
      </Typography>
      <Typography variant="body1" sx={{ color: '#9ca3af' }}>
        Model settings will be implemented soon.
      </Typography>
    </Box>
  );
};

export default ModelsTab;