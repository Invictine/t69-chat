import React, { useState } from 'react';
import { 
  Box, 
  GlobalStyles,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useTheme as useAppTheme } from '../../context/ThemeContext';
import { useChatContext } from '../../context/ChatContext';

// Import tabs - make sure these paths are correct
import CustomizationTab from './tabs/CustomizationTab';
import HistoryTab from './tabs/HistoryTab';
import ContactTab from './tabs/ContactTab';
import AccountTab from './tabs/AccountTab';
import ModelsTab from './tabs/ModelsTab';
import ApiKeysTab from './tabs/ApiKeysTab';
import AttachmentsTab from './tabs/AttachmentsTab';

// Import components
import SettingsSidebar from './components/SettingsSidebar';
import TabNavigation from './components/TabNavigation';

const Settings: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();
  useAppTheme();
  const { conversations, clearAllConversations } = useChatContext();

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'info' as 'error' | 'info' | 'success' 
  });

  // Tab selection
  const tabParam = searchParams.get('tab');
  const validTabs = ['account', 'customization', 'history', 'models', 'api', 'attachments', 'contact'];
  const defaultTab = validTabs.includes(tabParam || '') ? tabParam! : 'customization';
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ 
      height: '100vh',
      backgroundColor: '#0a0a0a',
      color: 'white',
      display: 'flex',
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      overflow: 'auto', // This enables scrolling for the entire page
    }}>
      <GlobalStyles
        styles={{
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
            backgroundColor: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#38383d',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          'html, body': {
            overflowX: 'hidden',
          }
        }}
      />
      
      <Box sx={{ 
        minHeight: '100%',
        backgroundColor: '#0a0a0a', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1150px',
        width: '100%',
      }}>
        {/* Header Bar with Back & Sign Out Buttons */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 1.5,
          mt: "1.4vh",
          backgroundColor: '#0a0a0a'
        }}>
          <Box
            onClick={() => navigate('/chat')}
            sx={{ 
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            ← Back to Chat
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Box
              onClick={() => signOut(() => navigate('/'))}
              sx={{
                color: '#9ca3af',
                fontWeight: 700,
                mr: 1,
                cursor: 'pointer',
                '&:hover': { 
                  textDecoration: 'underline'
                }
              }}
            >
              Sign out
            </Box>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          {/* Left Sidebar */}
          <SettingsSidebar 
            user={user} 
            isMobile={isMobile} 
          />

          {/* Main Content */}
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: '#0a0a0a',
            alignItems: 'left',
          }}>
            {/* Tabs Navigation */}
            <TabNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
              isMobile={isMobile} 
            />
              
            <Box sx={{ 
              p: isMobile ? 2 : 4, 
              margin: '0 auto',
              maxWidth: '900px',
              width: '100%'
            }}>
              {/* Tab Content */}
              {activeTab === 'customization' && <CustomizationTab />}
              {activeTab === 'history' && (
                <HistoryTab 
                  conversations={conversations} 
                  clearAllConversations={clearAllConversations}
                  onSnackbarMessage={(message, severity) => 
                    setSnackbar({ open: true, message, severity })}
                />
              )}
              {activeTab === 'contact' && <ContactTab />}
              {activeTab === 'account' && <AccountTab />}
              {activeTab === 'models' && <ModelsTab />}
              {activeTab === 'api' && <ApiKeysTab />}
              {activeTab === 'attachments' && <AttachmentsTab />}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;