import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Avatar,
  LinearProgress
} from '@mui/material';

interface SettingsSidebarProps {
  user: any;
  isMobile: boolean;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ user, isMobile }) => {
  return (
    <Box sx={{ 
      width: isMobile ? '100%' : 300,
      minWidth: isMobile ? 'auto' : 300,
      backgroundColor: '#0a0a0a',
      borderBottom: isMobile ? '1px solid #27272a' : 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: isMobile ? 2 : 3,
      overflow: isMobile ? 'auto' : 'initial',
      maxHeight: isMobile ? '30vh' : 'auto',
    }}>
      <Avatar 
        src={user?.imageUrl}
        alt={user?.fullName || 'User'}
        sx={{ width: isMobile ? 80 : 150, height: isMobile ? 80 : 150, mb: 2 }}
      />
      
      <Typography variant="h6" sx={{ mb: 0.5, textAlign: 'center' }}>
        {user?.fullName || 'User'}
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 2, color: '#9ca3af', textAlign: 'center' }}>
        {user?.primaryEmailAddress?.emailAddress}
      </Typography>
      
      <Button 
        variant="outlined" 
        size="small"
        sx={{
          borderColor: '#4a4a4a',
          color: '#9ca3af',
          backgroundColor: '#27272a',
          textTransform: 'none',
          mb: 4,
          borderRadius: '20px',
          px: 2
        }}
      >
        Free Plan
      </Button>

      {/* Message Usage */}
      <Box
        sx={{
          width: '100%',
          mb: 4,
          display: isMobile ? 'none' : 'block',
          p: 3,
          backgroundColor: 'rgba(24,24,27,0.8)',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 600 }}>
            Message Usage
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
            Resets tomorrow at 5:30 AM
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ color: '#d4d4d8' }}>
            Standard
          </Typography>
          <Typography variant="body2" sx={{ color: '#ffffff' }}>
            1/20
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={(1 / 20) * 100}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: '#38383d',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#7a0046'
            }
          }}
        />

        <Typography variant="caption" sx={{ color: '#9ca3af', mt: 1, display: 'block' }}>
          19 messages remaining
        </Typography>
      </Box>

      {/* Keyboard Shortcuts */}
      <Box
        sx={{
          width: '100%',
          mb: 4,
          p: 3,
          backgroundColor: 'rgba(24,24,27,0.8)',
          borderRadius: 2
        }}
      >
        <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2, fontWeight: 600 }}>
          Keyboard Shortcuts
        </Typography>
        {[
          { label: 'Search', keys: ['Ctrl', 'K'] },
          { label: 'New Chat', keys: ['Ctrl', 'Shift', 'O'] },
          { label: 'Toggle Sidebar', keys: ['Ctrl', 'B'] }
        ].map(({ label, keys }) => (
          <Box
            key={label}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
          >
            <Typography variant="body2" sx={{ color: '#d4d4d8' }}>
              {label}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {keys.map((k) => (
                <Box
                  key={k}
                  sx={{
                    bgcolor: '#27272a',
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 1
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600 }}>
                    {k}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SettingsSidebar;