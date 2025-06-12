import React from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Switch,
  Avatar,
  GlobalStyles,
  TextField,
  Chip,
  useMediaQuery,
  useTheme,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { ArrowBack, LightMode } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeTab, setActiveTab] = React.useState('customization'); // Default to Customization tab
  const [displayName, setDisplayName] = React.useState('Pincer Prithu');
  const [occupation, setOccupation] = React.useState('');
  const [selectedTraits, setSelectedTraits] = React.useState<string[]>([]);
  const [preferences, setPreferences] = React.useState('');
  const [boringTheme, setBoringTheme] = React.useState(false);
  const [hidePersonalInfo, setHidePersonalInfo] = React.useState(false);
  const [disableBreaks, setDisableBreaks] = React.useState(false);
  const [statsForNerds, setStatsForNerds] = React.useState(false);
  const [mainFont, setMainFont] = React.useState('proxima');
  const [codeFont, setCodeFont] = React.useState('roboto');
  
  // Function to handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTraitClick = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else if (selectedTraits.length < 3) {
      setSelectedTraits([...selectedTraits, trait]);
    }
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
    }}>
      <Box sx={{ 
        height: '100vh', 
        backgroundColor: '#0a0a0a', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1150px',
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
          }}
        />
        
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 1.5,
          mt: "1.4vh",
          backgroundColor: '#0a0a0a'
        }}>
          <Button
            onClick={() => navigate('/chat')}
            sx={{ 
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
            startIcon={<ArrowBack fontSize="small" />}
          >
            Back to Chat
          </Button>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Button
              sx={{
                color: '#9ca3af',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <LightMode fontSize="small" />
            </Button>
            
            <Button
              sx={{
                color: '#9ca3af',
                fontWeight: 700,
                mr: 1,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              Sign out
            </Button>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex',
          overflow: 'hidden',
          flexDirection: isMobile ? 'column' : 'row',
          
        }}>
          {/* Left Sidebar */}
          <Box sx={{ 
            width: isMobile ? '100%' : 300,
            minWidth: isMobile ? 'auto' : 300,
            backgroundColor: '#0a0a0a',
            borderRight: isMobile ? 'none' : '1px solid #27272a',
            borderBottom: isMobile ? '1px solid #27272a' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: isMobile ? 2 : 3,
            overflow: isMobile ? 'auto' : 'initial',
            maxHeight: isMobile ? '30vh' : 'auto',
          }}>
            <Avatar 
              src="/placeholder-avatar.png" 
              sx={{ width: isMobile ? 80 : 150, height: isMobile ? 80 : 150, mb: 2 }}
            />
            
            <Typography variant="h6" sx={{ mb: 0.5, textAlign: 'center' }}>
              Pincer Prithu
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#9ca3af', textAlign: 'center' }}>
              prithu.keshav@gmail.com
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
            <Box sx={{ width: '100%', mb: 4, display: isMobile ? 'none' : 'block' }}>
              <Typography variant="subtitle2" sx={{ color: '#9ca3af', mb: 1, fontWeight: 600 }}>
                Message Usage
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                  Resets tomorrow at 5:30 AM
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                  0/20
                </Typography>
              </Box>
              
              <Typography variant="subtitle2" sx={{ color: '#9ca3af', mb: 1, fontWeight: 600 }}>
                Standard
              </Typography>
              
              <Typography variant="body2" sx={{ color: '#d4d4d8' }}>
                20 messages remaining
              </Typography>
            </Box>

            {/* Keyboard Shortcuts */}
            <Box sx={{ width: '100%', display: isMobile ? 'none' : 'block' }}>
              <Typography variant="subtitle2" sx={{ color: '#9ca3af', mb: 2, fontWeight: 600 }}>
                Keyboard Shortcuts
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#d4d4d8' }}>Search</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ bgcolor: '#27272a', px: 1, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>Ctrl</Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#27272a', px: 1, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>K</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#d4d4d8' }}>New Chat</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ bgcolor: '#27272a', px: 1, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>Ctrl</Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#27272a', px: 1, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>Shift</Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#27272a', px: 1, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>O</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#d4d4d8' }}>Toggle Sidebar</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ bgcolor: '#27272a', px: 1, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>Ctrl</Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#27272a', px: 1, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>B</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Main Content */}
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: '#0a0a0a',
            overflowY: 'auto',
            alignItems: 'left',
          }}>
            {/* Tabs */}
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
              {['account', 'customization', 'history', 'models', 'api', 'attachments', 'contact'].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
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
              
            <Box sx={{ 
              p: isMobile ? 2 : 4, 
              flex: 1, 
              overflow: 'auto', 
              margin: '0 auto',
            }}>
              {/* Customization Tab */}
              {activeTab === 'customization' && (
                <>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                    Customize T3 Chat
                  </Typography>

                  {/* Name Customization */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#d4d4d8' }}>
                      What should T3 Chat call you?
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      sx={{ 
                        mb: 0.5,
                        '& .MuiInputBase-root': {
                          color: '#d4d4d8',
                          backgroundColor: 'rgba(39, 39, 42, 0.3)',
                          borderRadius: 1,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>0/50</Typography>
                    </Box>
                  </Box>

                  {/* Occupation */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#d4d4d8' }}>
                      What do you do?
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Engineer, student, etc..."
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      sx={{ 
                        mb: 0.5,
                        '& .MuiInputBase-root': {
                          color: '#d4d4d8',
                          backgroundColor: 'rgba(39, 39, 42, 0.3)',
                          borderRadius: 1,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>0/50</Typography>
                    </Box>
                  </Box>

                  {/* Traits Selection */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#d4d4d8' }}>
                      What traits should T3 Chat have? <Typography component="span" variant="caption" sx={{ color: '#9ca3af' }}>(up to 3, 500 chars each)</Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Type a trait and press Enter or Tab..."
                      disabled
                      sx={{ 
                        mb: 2,
                        '& .MuiInputBase-root': {
                          color: '#d4d4d8',
                          backgroundColor: 'rgba(39, 39, 42, 0.3)',
                          borderRadius: 1,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    />
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {['Friendly', 'Witty', 'Concise', 'Serious', 'Empathetic', 'Creative', 'Patient'].map((trait) => (
                        <Chip 
                          key={trait}
                          label={trait} 
                          onClick={() => handleTraitClick(trait.toLowerCase())}
                          sx={{ 
                            backgroundColor: selectedTraits.includes(trait.toLowerCase()) ? '#7a0046' : 'rgba(39, 39, 42, 0.8)',
                            color: '#d4d4d8',
                            '&:hover': {
                              backgroundColor: selectedTraits.includes(trait.toLowerCase()) ? '#900055' : 'rgba(39, 39, 42, 0.9)',
                            }
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>0/1500</Typography>
                    </Box>
                  </Box>

                  {/* Additional Preferences */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#d4d4d8' }}>
                      Anything else T3 Chat should know about you?
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Interests, values, or preferences to keep in mind"
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                      sx={{ 
                        mb: 0.5,
                        '& .MuiInputBase-root': {
                          color: '#d4d4d8',
                          backgroundColor: 'rgba(39, 39, 42, 0.3)',
                          borderRadius: 1,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>0/1000</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                    <Button 
                      variant="outlined"
                      sx={{ 
                        borderColor: '#4a4a4a',
                        color: '#9ca3af',
                        '&:hover': {
                          borderColor: '#6b6b6b',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      Load Legacy Data
                    </Button>
                    <Button 
                      variant="contained"
                      sx={{ 
                        backgroundColor: '#7a0046',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#900055',
                        }
                      }}
                    >
                      Save Preferences
                    </Button>
                  </Box>

                  {/* Visual Options Section */}
                  <Typography variant="h6" sx={{ mt: 6, mb: 3 }}>
                    Visual Options
                  </Typography>

                  {/* Boring Theme Toggle */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1" sx={{ color: '#d4d4d8' }}>
                          Boring Theme
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                          If you think the site is too much, turn this on to tone it down.
                        </Typography>
                      </Box>
                      <Switch
                        checked={boringTheme}
                        onChange={(e) => setBoringTheme(e.target.checked)}
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
                  </Box>

                  {/* Hide Personal Info Toggle */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1" sx={{ color: '#d4d4d8' }}>
                          Hide Personal Information
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                          Hides your name and email from the UI.
                        </Typography>
                      </Box>
                      <Switch
                        checked={hidePersonalInfo}
                        onChange={(e) => setHidePersonalInfo(e.target.checked)}
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
                  </Box>

                  {/* Disable Breaks Toggle */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1" sx={{ color: '#d4d4d8' }}>
                          Disable Thematic Breaks
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                          Inline horizontal lines in chat messages (Some browsers have trouble rendering these, turn off if you have issues with layout)
                        </Typography>
                      </Box>
                      <Switch
                        checked={disableBreaks}
                        onChange={(e) => setDisableBreaks(e.target.checked)}
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
                  </Box>

                  {/* Stats for Nerds Toggle */}
                  <Box sx={{ mb: 5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1" sx={{ color: '#d4d4d8' }}>
                          Stats for Nerds
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                          Displays more insights into message stats including tokens per second, time to first token, and estimated latency
                        </Typography>
                      </Box>
                      <Switch
                        checked={statsForNerds}
                        onChange={(e) => setStatsForNerds(e.target.checked)}
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
                  </Box>

                  {/* Font Settings */}
                  <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4, mb: 5 }}>
                    {/* Main Text Font */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ color: '#d4d4d8', mb: 1 }}>
                        Main Text Font
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#9ca3af', mb: 2 }}>
                        Used in general text throughout the app.
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={mainFont}
                          onChange={(e) => setMainFont(e.target.value as string)}
                          sx={{
                            backgroundColor: 'rgba(39, 39, 42, 0.3)',
                            color: '#d4d4d8',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                          }}
                        >
                          <MenuItem value="proxima">Proxima Nova (Default)</MenuItem>
                          <MenuItem value="inter">Inter</MenuItem>
                          <MenuItem value="system">System UI</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Code Font */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ color: '#d4d4d8', mb: 1 }}>
                        Code Font
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#9ca3af', mb: 2 }}>
                        Used in code blocks and inline code in chat messages.
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={codeFont}
                          onChange={(e) => setCodeFont(e.target.value as string)}
                          sx={{
                            backgroundColor: 'rgba(39, 39, 42, 0.3)',
                            color: '#d4d4d8',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                          }}
                        >
                          <MenuItem value="roboto">Roboto Mono (Default)</MenuItem>
                          <MenuItem value="jetbrains">JetBrains Mono</MenuItem>
                          <MenuItem value="fira">Fira Code</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Font Preview */}
                  <Box sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(39, 39, 42, 0.3)',
                    borderRadius: 1,
                    mb: 5
                  }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#d4d4d8' }}>
                      Fonts Preview
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ color: '#9ca3af', mb: 1 }}>
                          Can you write me a simple hello world program?
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#d4d4d8', mb: 2 }}>
                          Sure, here you go:
                        </Typography>
                      </Box>
                      <Box 
                        sx={{ 
                          flex: 1, 
                          backgroundColor: '#191919',
                          borderRadius: 1,
                          p: 2,
                          fontFamily: codeFont === 'roboto' ? '"Roboto Mono", monospace' : 
                                    codeFont === 'jetbrains' ? '"JetBrains Mono", monospace' : 
                                    '"Fira Code", monospace',
                          fontSize: '0.875rem',
                          color: '#d4d4d8',
                          overflow: 'auto'
                        }}
                      >
                        <pre style={{ margin: 0, overflowX: 'auto' }}>
  {`function hello(name: string) {
      console.log(\`Hello, \${name}!\`);
      return true;
  }`}
                        </pre>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained"
                      sx={{ 
                        backgroundColor: '#7a0046',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#900055',
                        }
                      }}
                    >
                      Save Settings
                    </Button>
                  </Box>
                </>
              )}

              {/* Contact Us Tab */}
              {activeTab === 'contact' && (
                <>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                    We're here to help!
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2
                  }}>
                    {/* Feature idea */}
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      border: '1px solid rgba(39, 39, 42, 0.5)', 
                      backgroundColor: 'rgba(24, 24, 27, 0.4)'
                    }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>✨</Box>
                        <Typography variant="h6" sx={{ color: '#d4d4d8' }}>
                          Have a cool feature idea?
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af', ml: 4 }}>
                        Vote on upcoming features or suggest your own
                      </Typography>
                    </Box>
                    
                    {/* Bug report */}
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      border: '1px solid rgba(39, 39, 42, 0.5)', 
                      backgroundColor: 'rgba(24, 24, 27, 0.4)'
                    }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>🐛</Box>
                        <Typography variant="h6" sx={{ color: '#d4d4d8' }}>
                          Found a non-critical bug?
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af', ml: 4 }}>
                        UI glitches or formatting issues? Report them here :)
                      </Typography>
                    </Box>
                    
                    {/* Account issues */}
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      border: '1px solid rgba(39, 39, 42, 0.5)', 
                      backgroundColor: 'rgba(24, 24, 27, 0.4)'
                    }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>⭕</Box>
                        <Typography variant="h6" sx={{ color: '#d4d4d8' }}>
                          Having account or billing issues?
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af', ml: 4 }}>
                        Email us for priority support - support@ping.gg
                      </Typography>
                    </Box>
                    
                    {/* Community */}
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      border: '1px solid rgba(39, 39, 42, 0.5)', 
                      backgroundColor: 'rgba(24, 24, 27, 0.4)'
                    }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>👥</Box>
                        <Typography variant="h6" sx={{ color: '#d4d4d8' }}>
                          Want to join the community?
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af', ml: 4 }}>
                        Come hang out in our Discord! Chat with the team and other users
                      </Typography>
                    </Box>
                    
                    {/* Privacy */}
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      border: '1px solid rgba(39, 39, 42, 0.5)', 
                      backgroundColor: 'rgba(24, 24, 27, 0.4)'
                    }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>🔒</Box>
                        <Typography variant="h6" sx={{ color: '#d4d4d8' }}>
                          Privacy Policy
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af', ml: 4 }}>
                        Read our privacy policy and data handling practices
                      </Typography>
                    </Box>
                    
                    {/* Terms */}
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      border: '1px solid rgba(39, 39, 42, 0.5)', 
                      backgroundColor: 'rgba(24, 24, 27, 0.4)'
                    }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>📃</Box>
                        <Typography variant="h6" sx={{ color: '#d4d4d8' }}>
                          Terms of Service
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af', ml: 4 }}>
                        Review our terms of service and usage guidelines
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
              
              {/* API Keys Tab */}
              {activeTab === 'api' && (
                <>
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                    API Keys
                  </Typography>
                  
                  <Typography variant="body1" sx={{ color: '#9ca3af', mb: 4 }}>
                    Bring your own API keys for select models.
                  </Typography>
                  
                  <Box sx={{ 
                    p: 4, 
                    borderRadius: 2, 
                    border: '1px solid rgba(39, 39, 42, 0.5)', 
                    backgroundColor: 'rgba(24, 24, 27, 0.4)',
                    textAlign: 'center'
                  }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#d4d4d8' }}>
                      Pro Feature
                    </Typography>
                    
                    <Typography variant="body1" sx={{ color: '#9ca3af', mb: 3 }}>
                      Upgrade to Pro to access this feature.
                    </Typography>
                    
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#7a0046',
                        color: '#fff',
                        borderRadius: '20px',
                        px: 2,
                        py: 1,
                        '&:hover': {
                          bgcolor: '#900055',
                        }
                      }}
                    >
                      Upgrade to Pro - $8/month
                    </Button>
                  </Box>
                </>
              )}
              
              {/* Models Tab */}
              {activeTab === 'models' && (
                <>
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                    Available Models
                  </Typography>
                  
                  <Typography variant="body1" sx={{ color: '#9ca3af', mb: 4 }}>
                    Choose which models appear in your model selector. This won't affect existing conversations.
                  </Typography>
                  
                  <Box sx={{ 
                    p: 3, 
                    mb: 3,
                    borderRadius: 2, 
                    border: '1px solid rgba(39, 39, 42, 0.5)', 
                    backgroundColor: 'rgba(24, 24, 27, 0.4)',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: 2
                  }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>✨</Box>
                      <Box>
                        <Typography variant="body1" sx={{ color: '#d4d4d8' }}>
                          New model added!
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                          v3 Pro is available now!
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: '#7a0046',
                        color: '#fff',
                        borderRadius: '20px',
                        '&:hover': {
                          bgcolor: '#900055',
                        }
                      }}
                    >
                      Get it
                    </Button>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between', 
                    mb: 3,
                    gap: 2
                  }}>
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                      Filter by features
                    </Typography>
                    
                    <Box>
                      <Button
                        size="small"
                        sx={{ color: '#9ca3af', mr: 1 }}
                      >
                        Select Recommended Models
                      </Button>
                      <Button
                        size="small"
                        sx={{ color: '#9ca3af' }}
                      >
                        Unselect All
                      </Button>
                    </Box>
                  </Box>
                  
                  {/* Model List */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* DeepSeek v3 */}
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      border: '1px solid rgba(39, 39, 42, 0.5)', 
                      backgroundColor: 'rgba(24, 24, 27, 0.4)',
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      justifyContent: 'space-between',
                      gap: 2
                    }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="body1" sx={{ color: '#d4d4d8', fontWeight: 500 }}>
                            DeepSeek v3 (Fireworks) 🔒
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#9ca3af', mb: 1 }}>
                          DeepSeek's groundbreaking direct prediction model.
                        </Typography>
                        <Button size="small" sx={{ color: '#9ca3af', p: 0 }}>
                          Show more
                        </Button>
                      </Box>
                      
                      <Switch
                        checked={true}
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
                    
                    {/* DeepSeek v3 (0324) */}
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      border: '1px solid rgba(39, 39, 42, 0.5)', 
                      backgroundColor: 'rgba(24, 24, 27, 0.4)',
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      justifyContent: 'space-between',
                      gap: 2
                    }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="body1" sx={{ color: '#d4d4d8', fontWeight: 500 }}>
                            DeepSeek v3 (0324) 🔒
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#9ca3af', mb: 1 }}>
                          DeepSeek V3, a 68B parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team.
                        </Typography>
                        <Button size="small" sx={{ color: '#9ca3af', p: 0 }}>
                          Show more
                        </Button>
                      </Box>
                      
                      <Switch
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
                  </Box>
                </>
              )}
              
              {/* Account Tab */}
              {activeTab === 'account' && (
                <>
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                    Upgrade to Pro
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
                    <Box />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      $8<Typography component="span" variant="body1" sx={{ color: '#9ca3af' }}>/month</Typography>
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
                    gap: 3, 
                    mb: 4
                  }}>
                    {/* Feature 1 */}
                    <Box sx={{ p: 3, backgroundColor: 'rgba(24, 24, 27, 0.4)', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>✨</Box>
                        <Typography variant="h6">Access to All Models</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                        Get access to our full suite of models including Claude, o3-mini-high, and more!
                      </Typography>
                    </Box>
                    
                    {/* Feature 2 */}
                    <Box sx={{ p: 3, backgroundColor: 'rgba(24, 24, 27, 0.4)', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>✨</Box>
                        <Typography variant="h6">Generous Limits</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                        Receive 1500 standard credits per month, plus 100 premium credits* per month.
                      </Typography>
                    </Box>
                    
                    {/* Feature 3 */}
                    <Box sx={{ p: 3, backgroundColor: 'rgba(24, 24, 27, 0.4)', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                        <Box sx={{ color: '#7a0046', fontWeight: 'bold' }}>👨‍💻</Box>
                        <Typography variant="h6">Priority Support</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                        Get faster responses and dedicated assistance from the T3 team whenever you need help!
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: '#7a0046',
                      color: '#fff',
                      py: 1.5,
                      mb: 2,
                      '&:hover': {
                        bgcolor: '#900055',
                      }
                    }}
                  >
                    Upgrade Now
                  </Button>
                  
                  <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', mb: 6 }}>
                    * Premium credits are used for GPT Image Gen, Claude Sonnet, and Grok 3. Additional Premium credits can be purchased separately.
                  </Typography>
                  
                  {/* Danger Zone */}
                  <Typography variant="h5" sx={{ color: '#e11d48', mb: 2 }}>
                    Danger Zone
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3 }}>
                    Permanently delete your account and all associated data.
                  </Typography>
                  
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'rgba(225, 29, 72, 0.1)',
                      color: '#e11d48',
                      borderColor: 'rgba(225, 29, 72, 0.2)',
                      '&:hover': {
                        bgcolor: 'rgba(225, 29, 72, 0.2)',
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
