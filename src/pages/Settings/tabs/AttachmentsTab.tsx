import React from 'react';
import { Box, Typography } from '@mui/material';

const AttachmentsTab: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Attachments
      </Typography>
      <Typography variant="body1" sx={{ color: '#9ca3af' }}>
        Attachment management will be implemented soon.
      </Typography>
    </Box>
  );
};

export default AttachmentsTab;