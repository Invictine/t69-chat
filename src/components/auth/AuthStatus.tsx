import React from 'react';
import { Box, Chip } from '@mui/material';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Person, Security } from '@mui/icons-material';

const AuthStatus: React.FC = () => {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <Chip
        size="small"
        label="Loading..."
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#9ca3af',
          fontSize: '0.75rem'
        }}
      />
    );
  }

  if (!isSignedIn || !user) {
    return (
      <Chip
        icon={<Security sx={{ fontSize: '16px !important' }} />}
        size="small"
        label="Not signed in"
        sx={{ 
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: '#ef4444',
          fontSize: '0.75rem'
        }}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip
        icon={<Person sx={{ fontSize: '16px !important' }} />}
        size="small"
        label={`Signed in as ${user.firstName || user.emailAddresses[0]?.emailAddress}`}
        sx={{ 
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          color: '#22c55e',
          fontSize: '0.75rem',
          maxWidth: '200px',
          '& .MuiChip-label': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }}
      />
    </Box>
  );
};

export default AuthStatus;
