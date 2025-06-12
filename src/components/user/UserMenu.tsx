import React from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Avatar,
} from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/settings?tab=account');
  };


  if (!user) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
      <IconButton
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          borderRadius: '8px',
          px: 1,
          py: 1,
          my: 0.2,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <Avatar
          src={user.imageUrl}
          sx={{ width: 35, height: 35, border: '2px solid #7a0046', bgcolor: '#7a0046', color: '#fff' }}
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
              whiteSpace: "nowrap",
              my: 0,
            }}
          >
            {user.firstName || user.emailAddresses[0]?.emailAddress}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: "#ffff", 
              fontSize: "0.7rem",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 400,
              whiteSpace: "nowrap",
              my: 0,
            }}
          >
            Free
          </Typography>
        </Box>
      </IconButton>

      
    </Box>
  );
};

export default UserMenu;
