import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SupportIcon from '@mui/icons-material/Support';

const AccountTab: React.FC = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Upgrade to Pro
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          <Box component="span" sx={{ fontSize: '2rem' }}>$8</Box>
          <Box component="span" sx={{ fontSize: '1rem', color: '#9ca3af' }}>/month</Box>
        </Typography>
      </Box>

      {/* Feature Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        {/* Access to All Models */}
        <Box sx={{ flex: 1, p: 3, backgroundColor: 'rgba(39,39,42,0.3)', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <RocketLaunchIcon sx={{ color: '#ce1476', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Access to All Models
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            Get access to our full suite of models including Claude, o3-mini-high, and more!
          </Typography>
        </Box>
        
        {/* Generous Limits */}
        <Box sx={{ flex: 1, p: 3, backgroundColor: 'rgba(39,39,42,0.3)', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AutoAwesomeIcon sx={{ color: '#ce1476', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Generous Limits
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            Receive <Box component="span" sx={{ fontWeight: 600 }}>1500 standard credits</Box> per month, plus <Box component="span" sx={{ fontWeight: 600 }}>100 premium credits*</Box> per month.
          </Typography>
        </Box>
        
        {/* Priority Support */}
        <Box sx={{ flex: 1, p: 3, backgroundColor: 'rgba(39,39,42,0.3)', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <SupportIcon sx={{ color: '#ce1476', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Priority Support
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            Get faster responses and dedicated assistance from the T3 team whenever you need help!
          </Typography>
        </Box>
      </Box>

      {/* Upgrade Button */}
      <Button 
        variant="contained"
        fullWidth
        sx={{ 
          mb: 2, 
          py: 1.5,
          backgroundColor: '#ce1476',
          '&:hover': {
            backgroundColor: '#a01058'
          }
        }}
      >
        Upgrade Now
      </Button>

      {/* Premium Credits Note */}
      <Typography variant="caption" sx={{ display: 'block', mb: 6, color: '#9ca3af' }}>
        *Premium credits are used for GPT Image Gen, Claude Sonnet, and Grok 3. Additional Premium credits can be purchased separately.
      </Typography>

      {/* Danger Zone */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Danger Zone
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: '#9ca3af' }}>
        Permanently delete your account and all associated data.
      </Typography>
      <Button 
        variant="outlined" 
        sx={{ 
          borderColor: '#7f1d1d',
          color: '#ef4444',
          '&:hover': {
            borderColor: '#b91c1c',
            backgroundColor: 'rgba(239, 68, 68, 0.04)'
          }
        }}
      >
        Delete Account
      </Button>
    </>
  );
};

export default AccountTab;