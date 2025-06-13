import React from 'react';
import { Box, Button } from '@mui/material';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  onTabChange,
  isMobile
}) => {
  const tabs = ['account', 'customization', 'history', 'models', 'api', 'attachments', 'contact'];
  
  return (
    <Box
      sx={{
        display: 'flex',
        gap: isMobile ? 1 : 0.5,
        p: isMobile ? 1 : 0.5,
        ml: isMobile ? 0 : 5.8,
        mt: isMobile ? 0 : 2,
        border: '1px solid rgba(39, 39, 42, 0.5)',
        borderRadius: 2.5,
        backgroundColor: '#302836',
        width: '100%',
        maxWidth: '708px',
        overflow: 'auto',
        flexWrap: isMobile ? 'nowrap' : 'wrap',
        fontSize: isMobile ? '0.8rem' : '0.9rem',
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab}
          onClick={() => onTabChange(tab)}
          sx={{
            color: activeTab === tab ? '#ffff' : '#C4B6CF',
            backgroundColor: activeTab === tab ? '#21141E' : 'none',
            borderRadius: '7px',
            px: isMobile ? 0.5 : 1.4,
            py: 0.2,
            textTransform: 'capitalize',
            fontWeight: activeTab === tab ? 600 : 600,
            fontSize: isMobile ? '0.8rem' : 'inherit',
            minWidth: isMobile ? 'auto' : undefined,
            whiteSpace: 'nowrap',
          }}
        >
          {tab === 'api' ? 'API Keys' : 
          tab === 'history' ? 'History & Sync' : 
          tab === 'contact' ? 'Contact Us' : 
          tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Button>
      ))}
    </Box>
  );
};

export default TabNavigation;