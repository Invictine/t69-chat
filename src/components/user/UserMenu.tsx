import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography, 
  Avatar,
  Divider 
} from '@mui/material';
import { 
  Settings, 
  ExpandMore 
} from '@mui/icons-material';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import SignOutButton from '../auth/SignOutButton';

const UserMenu: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    handleClose();
  };

  if (!user) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <IconButton
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          width: '100%',
          borderRadius: '8px',
          p: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <Avatar
          src={user.imageUrl}
          sx={{ width: 32, height: 32 }}
        >
          {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase()}
        </Avatar>
        
        <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#fff", 
              fontSize: "0.875rem",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {user.firstName || user.emailAddresses[0]?.emailAddress}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: "#9ca3af", 
              fontSize: "0.75rem",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {user.emailAddresses[0]?.emailAddress}
          </Typography>
        </Box>

        <ExpandMore sx={{ color: '#9ca3af', fontSize: 18 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            minWidth: 200,
            mt: 1,
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem 
          onClick={handleSettingsClick}
          sx={{ 
            color: '#e0e0e0',
            py: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <Settings sx={{ mr: 2, fontSize: 18 }} />
          Settings
        </MenuItem>
        
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <MenuItem 
          sx={{ 
            color: '#ef4444',
            py: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            }
          }}
        >
          <SignOutButton variant="menuItem" onSignOut={handleClose} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
