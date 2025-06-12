import React from 'react';
import { Button, Box } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useClerk } from '@clerk/clerk-react';

interface SignOutButtonProps {
  variant?: 'button' | 'menuItem';
  onSignOut?: () => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ 
  variant = 'button', 
  onSignOut 
}) => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      if (onSignOut) {
        onSignOut();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  if (variant === 'menuItem') {
    return (
      <Box
        onClick={handleSignOut}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          color: 'inherit',
          cursor: 'pointer'
        }}
      >
        <LogoutOutlined sx={{ mr: 2, fontSize: 18 }} />
        Sign Out
      </Box>
    );
  }

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleSignOut}
      startIcon={<LogoutOutlined />}
      sx={{
        borderColor: '#ef4444',
        color: '#ef4444',
        '&:hover': {
          borderColor: '#dc2626',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
        }
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
