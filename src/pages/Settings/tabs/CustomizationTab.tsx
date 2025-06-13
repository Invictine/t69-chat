import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  FormGroup,
  InputAdornment,
  Select,
  MenuItem,
  GlobalStyles,
  Snackbar,
  Alert
} from '@mui/material';
import { useTheme as useAppTheme } from '../../../context/ThemeContext';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

const CustomizationTab: React.FC = () => {
  const { user } = useUser();
  const userId = user?.id || '';
  const { boringMode, setBoringMode } = useAppTheme();
  
  // Convex operations
  const savePreferences = useMutation(api.userPreferences.saveUserPreferences);
  const loadLegacyData = useMutation(api.userPreferences.loadLegacyData);
  const userPreferences = useQuery(api.userPreferences.getUserPreferences, { userId });
  
  // Form states with defaults
  const [username, setUsername] = useState('');
  const [occupation, setOccupation] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [hidePersonalInfo, setHidePersonalInfo] = useState(false);
  const [disableThematicBreaks, setDisableThematicBreaks] = useState(false);
  const [statsForNerds, setStatsForNerds] = useState(false);
  const [mainFont, setMainFont] = useState('Proxima Vara');
  const [codeFont, setCodeFont] = useState('Berkeley Mono');
  
  // Traits management
  const [traits, setTraits] = useState<string[]>(['friendly', 'concise', 'empathetic']);
  const [traitInput, setTraitInput] = useState('');
  
  const availableTraits = ['witty', 'curious', 'creative', 'patient'];
  
  // Snackbar state for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'error' | 'success' | 'info' | 'warning'
  });
  
  // Load preferences from Convex when data is available
  useEffect(() => {
    if (userPreferences) {
      setUsername(userPreferences.username || '');
      setOccupation(userPreferences.occupation || '');
      setAboutText(userPreferences.aboutText || '');
      setHidePersonalInfo(userPreferences.hidePersonalInfo || false);
      setDisableThematicBreaks(userPreferences.disableThematicBreaks || false);
      setStatsForNerds(userPreferences.statsForNerds || false);
      setMainFont(userPreferences.mainFont || 'Proxima Vara');
      setCodeFont(userPreferences.codeFont || 'Berkeley Mono');
      setTraits(userPreferences.traits || ['friendly', 'concise', 'empathetic']);
      
      // Update global boringMode state if it differs from stored preference
      if (userPreferences.boringMode !== undefined && 
          userPreferences.boringMode !== boringMode) {
        setBoringMode(userPreferences.boringMode);
      }
    }
  }, [userPreferences, setBoringMode, boringMode]);
  
  const handleAddTrait = (trait: string) => {
    if (!traits.includes(trait)) {
      setTraits([...traits, trait]);
    }
  };
  
  const handleDeleteTrait = (trait: string) => {
    setTraits(traits.filter(t => t !== trait));
  };
  
  const handleSavePreferences = async () => {
    try {
      if (!userId) {
        setSnackbar({
          open: true,
          message: 'You must be logged in to save preferences',
          severity: 'error'
        });
        return;
      }
      
      await savePreferences({
        userId,
        username,
        occupation,
        traits,
        aboutText,
        hidePersonalInfo,
        disableThematicBreaks,
        statsForNerds,
        mainFont,
        codeFont,
        boringMode
      });
      
      setSnackbar({
        open: true,
        message: 'Preferences saved successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save preferences',
        severity: 'error'
      });
    }
  };
  
  const handleLoadLegacyData = async () => {
    try {
      if (!userId) {
        setSnackbar({
          open: true,
          message: 'You must be logged in to load legacy data',
          severity: 'error'
        });
        return;
      }
      
      await loadLegacyData({ userId });
      
      setSnackbar({
        open: true,
        message: 'Legacy data loaded successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error loading legacy data:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load legacy data',
        severity: 'error'
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="left-scrollbar-container">
      <GlobalStyles
        styles={{
          '.left-scrollbar-container': {
            overflow: 'auto',
            height: '100%',
            width: '100%',
            direction: 'rtl',
            '& > *': {
              direction: 'ltr',
            },
          },
          '.left-scrollbar-container::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '.left-scrollbar-container::-webkit-scrollbar-thumb': {
            backgroundColor: '#38383d',
            borderRadius: '4px',
          },
          '.left-scrollbar-container::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }}
      />

      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Customize T3 Chat
        </Typography>
        
        {/* Personal Customization */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              What should T3 Chat call you?
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">{username.length}/50</InputAdornment>,
              }}
              inputProps={{ maxLength: 50 }}
              sx={{
                backgroundColor: 'rgba(24, 24, 27, 0.4)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(39, 39, 42, 0.5)' },
                  '&:hover fieldset': { borderColor: 'rgba(39, 39, 42, 0.8)' },
                  '&.Mui-focused fieldset': { borderColor: '#7a0046' }
                },
                '& .MuiInputBase-input': { color: '#d4d4d8' }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              What do you do?
            </Typography>
            <TextField
              fullWidth
              placeholder="Engineer, student, etc."
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">{occupation.length}/100</InputAdornment>,
              }}
              inputProps={{ maxLength: 100 }}
              sx={{
                backgroundColor: 'rgba(24, 24, 27, 0.4)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(39, 39, 42, 0.5)' },
                  '&:hover fieldset': { borderColor: 'rgba(39, 39, 42, 0.8)' },
                  '&.Mui-focused fieldset': { borderColor: '#7a0046' }
                },
                '& .MuiInputBase-input': { color: '#d4d4d8' }
              }}
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              What traits should T3 Chat have? <Typography component="span" variant="caption">(up to 50, max 100 chars each)</Typography>
            </Typography>
            <TextField
              fullWidth
              placeholder="Type a trait and press Enter or Tab..."
              value={traitInput}
              onChange={(e) => setTraitInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === 'Tab') && traitInput.trim()) {
                  e.preventDefault();
                  handleAddTrait(traitInput.trim());
                  setTraitInput('');
                }
              }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {traits.map((trait) => (
                      <Chip
                        key={trait}
                        label={trait}
                        onDelete={() => handleDeleteTrait(trait)}
                        size="small"
                        sx={{ 
                          backgroundColor: '#2c2c30',
                          color: '#fff',
                          borderRadius: '4px',
                        }}
                      />
                    ))}
                  </Box>
                ),
                endAdornment: <InputAdornment position="end">{traits.length}/50</InputAdornment>,
              }}
              sx={{
                backgroundColor: 'rgba(24, 24, 27, 0.4)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(39, 39, 42, 0.5)' },
                  '&:hover fieldset': { borderColor: 'rgba(39, 39, 42, 0.8)' },
                  '&.Mui-focused fieldset': { borderColor: '#7a0046' }
                },
                '& .MuiInputBase-input': { color: '#d4d4d8' }
              }}
            />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
              {availableTraits.map((trait) => (
                <Chip
                  key={trait}
                  label={trait}
                  onClick={() => handleAddTrait(trait)}
                  deleteIcon={<span>+</span>}
                  onDelete={() => handleAddTrait(trait)}
                  sx={{ 
                    backgroundColor: 'rgba(39, 39, 42, 0.5)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(39, 39, 42, 0.8)',
                    },
                    '& .MuiChip-deleteIcon': {
                      color: '#fff'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              Anything else T3 Chat should know about you?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Interests, values, or preferences to keep in mind"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              InputProps={{
                endAdornment: <Box component="span" sx={{ position: 'absolute', bottom: 8, right: 8, color: '#9ca3af', fontSize: '0.75rem' }}>{aboutText.length}/3000</Box>,
              }}
              inputProps={{ maxLength: 3000 }}
              sx={{
                backgroundColor: 'rgba(24, 24, 27, 0.4)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(39, 39, 42, 0.5)' },
                  '&:hover fieldset': { borderColor: 'rgba(39, 39, 42, 0.8)' },
                  '&.Mui-focused fieldset': { borderColor: '#7a0046' }
                },
                '& .MuiInputBase-input': { color: '#d4d4d8' }
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 4 }}>
            <Button
              variant="outlined"
              onClick={handleLoadLegacyData}
              sx={{ 
                borderColor: 'rgba(39, 39, 42, 0.5)',
                color: '#9ca3af',
                textTransform: 'uppercase'
              }}
            >
              Load Legacy Data
            </Button>
            
            <Button
              variant="contained"
              onClick={handleSavePreferences}
              sx={{ 
                backgroundColor: '#7a0046',
                '&:hover': {
                  backgroundColor: '#900055'
                },
                textTransform: 'uppercase'
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </Box>
        
        {/* Visual Options */}
        <Typography variant="h5" sx={{ mb: 3, mt: 6, fontWeight: 600 }}>
          Visual Options
        </Typography>
        
        <FormGroup sx={{ mb: 4 }}>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={boringMode}
                  onChange={(e) => {
                    setBoringMode(e.target.checked);
                    // Also save immediately for a responsive feel
                    if (userId) {
                      savePreferences({
                        userId,
                        boringMode: e.target.checked
                      }).catch(console.error);
                    }
                  }}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#7a0046',
                      '&:hover': {
                        backgroundColor: 'rgba(122, 0, 70, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#7a0046',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1">Boring Theme</Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block' }}>
                    If you think the pink is too much, turn this on to tone it down.
                  </Typography>
                </Box>
              }
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={hidePersonalInfo}
                  onChange={(e) => setHidePersonalInfo(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#7a0046',
                      '&:hover': {
                        backgroundColor: 'rgba(122, 0, 70, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#7a0046',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1">Hide Personal Information</Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block' }}>
                    Hides your name and email from the UI.
                  </Typography>
                </Box>
              }
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={disableThematicBreaks}
                  onChange={(e) => setDisableThematicBreaks(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#7a0046',
                      '&:hover': {
                        backgroundColor: 'rgba(122, 0, 70, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#7a0046',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1">Disable Thematic Breaks</Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block' }}>
                    Hides horizontal lines in chat messages. (Some browsers have trouble rendering these, turn off if you have bugs with duplicated lines)
                  </Typography>
                </Box>
              }
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={statsForNerds}
                  onChange={(e) => setStatsForNerds(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#7a0046',
                      '&:hover': {
                        backgroundColor: 'rgba(122, 0, 70, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#7a0046',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1">Stats for Nerds</Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block' }}>
                    Enables more insights into message stats including tokens per second, time to first token, and estimated tokens in the message.
                  </Typography>
                </Box>
              }
            />
          </Box>
        </FormGroup>
        
        {/* Font Settings */}
        <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              Main Text Font
            </Typography>
            <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', mb: 1 }}>
              Used in general text throughout the app.
            </Typography>
            <Select
              fullWidth
              value={mainFont}
              onChange={(e) => setMainFont(e.target.value)}
              sx={{
                backgroundColor: '#1a1a1a',
                color: '#d4d4d8',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(39, 39, 42, 0.5)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(39, 39, 42, 0.8)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#7a0046'
                },
                '& .MuiSvgIcon-root': {
                  color: '#9ca3af'
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#1a1a1a',
                    color: '#d4d4d8',
                    '& .MuiMenuItem-root:hover': {
                      backgroundColor: 'rgba(39, 39, 42, 0.8)',
                    },
                    '& .MuiMenuItem-root.Mui-selected': {
                      backgroundColor: '#2c2c30',
                    }
                  }
                }
              }}
            >
              <MenuItem value="Proxima Vara" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Proxima Vara (default)
                {mainFont === 'Proxima Vara' && <Box component="span" sx={{ color: '#9ca3af' }}>✓</Box>}
              </MenuItem>
              <MenuItem value="Atkinson Hyperlegible">Atkinson Hyperlegible</MenuItem>
              <MenuItem value="OpenDyslexic">OpenDyslexic</MenuItem>
              <MenuItem value="System Font">System Font</MenuItem>
            </Select>
            
            <Typography variant="h6" sx={{ mb: 1, mt: 3, fontWeight: 500 }}>
              Code Font
            </Typography>
            <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', mb: 1 }}>
              Used in code blocks and inline code in chat messages.
            </Typography>
            <Select
              fullWidth
              value={codeFont}
              onChange={(e) => setCodeFont(e.target.value)}
              sx={{
                backgroundColor: '#1a1a1a',
                color: '#d4d4d8',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(39, 39, 42, 0.5)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(39, 39, 42, 0.8)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#7a0046'
                },
                '& .MuiSvgIcon-root': {
                  color: '#9ca3af'
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#1a1a1a',
                    color: '#d4d4d8',
                    '& .MuiMenuItem-root:hover': {
                      backgroundColor: 'rgba(39, 39, 42, 0.8)',
                    },
                    '& .MuiMenuItem-root.Mui-selected': {
                      backgroundColor: '#2c2c30',
                    }
                  }
                }
              }}
            >
              <MenuItem value="Berkeley Mono" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Berkeley Mono (default)
                {codeFont === 'Berkeley Mono' && <Box component="span" sx={{ color: '#9ca3af' }}>✓</Box>}
              </MenuItem>
              <MenuItem value="Intel One Mono">Intel One Mono</MenuItem>
              <MenuItem value="Atkinson Hyperlegible Mono">Atkinson Hyperlegible Mono</MenuItem>
              <MenuItem value="System Monospace Font">System Monospace Font</MenuItem>
            </Select>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Fonts Preview
            </Typography>
            
            <Box sx={{ 
              p: 3, 
              backgroundColor: '#18181b', 
              borderRadius: 2, 
              mb: 2, 
              height: '250px', 
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ 
                  color: '#d4d4d8',
                  fontFamily: mainFont === 'System Font' 
                    ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' 
                    : mainFont
                }}>
                  Can you write me a simple hello world program?
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ 
                  color: '#d4d4d8',
                  fontFamily: mainFont === 'System Font' 
                    ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' 
                    : mainFont
                }}>
                  Sure, here you go:
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  backgroundColor: '#121212', 
                  p: 2, 
                  borderRadius: 1,
                  fontFamily: codeFont === 'System Monospace Font' 
                    ? 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' 
                    : codeFont,
                  fontSize: '0.875rem',
                  color: '#e4e4e7',
                  overflow: 'auto',
                }}
              >
                <Box sx={{ ml: 1, color: '#9ca3af', mb: 0.5 }}>typescript</Box>
                <pre style={{ margin: 0 }}>
                  <Box component="span" sx={{ color: '#c678dd' }}>function</Box>
                  <Box component="span" sx={{ color: '#61afef' }}> greet</Box>
                  <Box component="span" sx={{ color: '#abb2bf' }}>{'('}</Box>
                  <Box component="span" sx={{ color: '#e06c75' }}>name</Box>
                  <Box component="span" sx={{ color: '#abb2bf' }}>: </Box>
                  <Box component="span" sx={{ color: '#98c379' }}>string</Box>
                  <Box component="span" sx={{ color: '#abb2bf' }}>) {'\{'}</Box><br/>
                  <Box component="span" sx={{ color: '#e06c75', ml: 2 }}>console</Box>
                  <Box component="span" sx={{ color: '#abb2bf' }}>.</Box>
                  <Box component="span" sx={{ color: '#61afef' }}>log</Box>
                  <Box component="span" sx={{ color: '#abb2bf' }}>{'('}</Box>
                  <Box component="span" sx={{ color: '#98c379' }}>'Hello, </Box>
                  <Box component="span" sx={{ color: '#56b6c2' }}>{'${'}</Box>
                  <Box component="span" sx={{ color: '#e06c75' }}>name</Box>
                  <Box component="span" sx={{ color: '#56b6c2' }}>{'}'}</Box>
                  <Box component="span" sx={{ color: '#98c379' }}>!'</Box>
                  <Box component="span" sx={{ color: '#abb2bf' }}>);</Box><br/>
                  <Box component="span" sx={{ color: '#c678dd', ml: 2 }}>return </Box>
                  <Box component="span" sx={{ color: '#d19a66' }}>true</Box>
                  <Box component="span" sx={{ color: '#abb2bf' }}>;</Box><br/>
                  <Box component="span" sx={{ color: '#abb2bf' }}>{'\}'}</Box>
                </pre>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      
      {/* Feedback snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomizationTab;