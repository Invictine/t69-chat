import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Switch,
  Divider,
  Button,
  Alert
} from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SignOutButton from '../components/auth/SignOutButton';

const Settings: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [theme, setTheme] = React.useState('dark');
  const [notifications, setNotifications] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const handleSaveSettings = () => {
    // Here you would typically save settings to localStorage or a backend
    localStorage.setItem('chatSettings', JSON.stringify({
      theme,
      notifications,
      autoSave
    }));
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  React.useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('chatSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTheme(settings.theme || 'dark');
      setNotifications(settings.notifications ?? true);
      setAutoSave(settings.autoSave ?? true);
    }
  }, []);

  return (
    <Box sx={{ 
      height: '100vh', 
      backgroundColor: '#0a0a0a', 
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        p: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Button
          onClick={() => navigate('/chat')}
          sx={{ 
            color: '#9ca3af',
            minWidth: 'auto',
            p: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <ArrowBack />
        </Button>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
          Settings
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center',
        p: 3,
        overflowY: 'auto'
      }}>
        <Box sx={{ maxWidth: 600, width: '100%' }}>
          {showSuccessMessage && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                color: '#4caf50',
                border: '1px solid rgba(76, 175, 80, 0.3)'
              }}
            >
              Settings saved successfully!
            </Alert>
          )}

          {/* User Profile Section */}
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Profile
            </Typography>
            {user && (
              <Box>
                <Typography variant="body1" sx={{ color: '#e0e0e0', mb: 1 }}>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1" sx={{ color: '#e0e0e0', mb: 1 }}>
                  <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}
                </Typography>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  <strong>Member since:</strong> {new Date(user.createdAt || '').toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Appearance Settings */}
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Appearance
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: '#e0e0e0', mb: 1 }}>
                Theme
              </FormLabel>
              <RadioGroup
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <FormControlLabel 
                  value="dark" 
                  control={<Radio sx={{ color: '#9ca3af' }} />} 
                  label={<Typography sx={{ color: '#e0e0e0' }}>Dark</Typography>}
                />
                <FormControlLabel 
                  value="light" 
                  control={<Radio sx={{ color: '#9ca3af' }} />} 
                  label={<Typography sx={{ color: '#e0e0e0' }}>Light</Typography>}
                />
                <FormControlLabel 
                  value="auto" 
                  control={<Radio sx={{ color: '#9ca3af' }} />} 
                  label={<Typography sx={{ color: '#e0e0e0' }}>Auto</Typography>}
                />
              </RadioGroup>
            </FormControl>
          </Paper>

          {/* Chat Settings */}
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              Chat Preferences
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Enable Notifications
                </Typography>
                <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                  Get notified when you receive new messages
                </Typography>
              </Box>
              <Switch
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#7a0046',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#7a0046',
                  },
                }}
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  Auto-save Conversations
                </Typography>
                <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                  Automatically save your chat history
                </Typography>
              </Box>
              <Switch
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#7a0046',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#7a0046',
                  },
                }}
              />
            </Box>
          </Paper>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              onClick={handleSaveSettings}
              sx={{
                backgroundColor: '#7a0046',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#640033',
                }
              }}
            >
              Save Settings
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/chat')}
              sx={{
                borderColor: '#9ca3af',
                color: '#9ca3af',
                '&:hover': {
                  borderColor: '#e0e0e0',
                  color: '#e0e0e0',
                }
              }}
            >
              Cancel
            </Button>
          </Box>

          {/* Danger Zone */}
          <Paper sx={{ 
            p: 3, 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(220, 38, 38, 0.3)'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#ef4444' }}>
              Danger Zone
            </Typography>            <Typography variant="body2" sx={{ color: '#9ca3af', mb: 2 }}>
              Once you sign out, you'll need to sign back in to access your conversations.
            </Typography>
            <SignOutButton onSignOut={() => navigate('/')} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
