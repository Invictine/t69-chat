import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  ListItemButton, 
  IconButton, 
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Fade
} from '@mui/material';
import { 
  Search, 
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useChatContext } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import UserMenu from '../user/UserMenu';

// Create a new type for sidebar props
interface SidebarProps {
  isVisible: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onToggle }) => {
  const { 
    conversations, 
    currentConv, 
    setCurrentConv, 
    handleNewConversation,
    deleteConversation,
    clearAllConversations
  } = useChatContext();
  
  const { themeOptions } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuConvIndex, setMenuConvIndex] = useState<number>(-1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setMenuConvIndex(index);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuConvIndex(-1);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    deleteConversation(menuConvIndex);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  
  const handleClearAllClick = () => {
    setDeleteAllDialogOpen(true);
  };
  
  const handleClearAllConfirm = () => {
    clearAllConversations();
    setDeleteAllDialogOpen(false);
  };
  
  const handleClearAllCancel = () => {
    setDeleteAllDialogOpen(false);
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => 
    (conv.title ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Group conversations by date
  const today = new Date().toDateString();
  const todayConversations = filteredConversations.filter(conv => 
    conv.updatedAt && new Date(conv.updatedAt).toDateString() === today
  );
  
  const olderConversations = filteredConversations.filter(conv => 
    !conv.updatedAt || new Date(conv.updatedAt).toDateString() !== today
  );

  
  // Return the full sidebar
  return (
    <Slide direction="right" in={isVisible} mountOnEnter unmountOnExit>
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: themeOptions.background.sidebar,
          width: "256px",
          transition: "width 0.3s ease",
          position: "relative",
          zIndex: 10,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Box p={2} pb={1.5} display="flex" flexDirection="column" height="100%">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 600, 
                color: themeOptions.text.primary, 
                flexGrow: 1,
                fontSize: '1.1rem'
              }}
            >
              T69.chat
            </Typography>
            <IconButton 
              onClick={onToggle}
              sx={{ color: themeOptions.text.secondary }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleNewConversation} 
            sx={{
              backgroundColor: themeOptions.button.primary,
              color: themeOptions.button.text,
              borderRadius: "6px",
              textTransform: "none",
              fontWeight: 500,
              padding: "10px 16px",
              mb: 2,
              "&:hover": {
                backgroundColor: themeOptions.button.hover,
              }
            }}
          >
            New Chat
          </Button>
          
          <Box 
            sx={{
              backgroundColor: themeOptions.background.input,
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              px: 1.5,
              py: 1,
              mb: 2
            }}
          >
            <Search sx={{ color: themeOptions.text.secondary, fontSize: 18, mr: 1 }} />
            <input
              placeholder="Search your threads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: themeOptions.text.secondary,
                fontSize: "0.875rem",
                width: "100%",
              }}
            />
          </Box>
          
          <Box flex={1} sx={{ overflowY: "auto" }}>
            {/* Display today's conversations with a header */}
            {todayConversations.length > 0 && (
              <>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: themeOptions.text.caption, 
                    fontSize: "0.7rem",
                    display: 'block',
                    pl: 1,
                    mb: 0.5 
                  }}
                >
                  Today
                </Typography>
                
                {todayConversations.map((conv, index) => {
                  const convIndex = conversations.indexOf(conv);
                  return (
                    <ListItemButton
                      key={convIndex}
                      selected={convIndex === currentConv}
                      onClick={() => setCurrentConv(convIndex)}
                      sx={{ 
                        borderRadius: "4px",
                        py: 0.75,
                        px: 1.5,
                        mb: 0.5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: convIndex === currentConv ? themeOptions.background.selected : "transparent",
                        "&:hover": {
                          backgroundColor: convIndex === currentConv ? themeOptions.background.selected : themeOptions.background.hover
                        }
                      }}
                    >
                      <Typography 
                        noWrap 
                        sx={{ 
                          fontSize: "0.875rem", 
                          color: convIndex === currentConv ? themeOptions.text.primary : themeOptions.text.secondary,
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {conv.title}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuOpen(e, convIndex)}
                        sx={{ 
                          color: themeOptions.text.secondary, 
                          padding: 0.25,
                          visibility: convIndex === currentConv ? 'visible' : 'hidden',
                          '.MuiListItemButton-root:hover &': {
                            visibility: 'visible',
                          }
                        }}
                      >
                        <MoreIcon fontSize="small" />
                      </IconButton>
                    </ListItemButton>
                  );
                })}
              </>
            )}
            
            {/* Rest of your existing conversation list */}
            {olderConversations.length > 0 && (
              <>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: themeOptions.text.caption, 
                    fontSize: "0.7rem",
                    display: 'block',
                    pl: 1,
                    mb: 0.5 
                  }}
                >
                  Older
                </Typography>
                
                {olderConversations.map((conv, index) => {
                  const convIndex = conversations.indexOf(conv);
                  return (
                    <ListItemButton
                      key={convIndex}
                      selected={convIndex === currentConv}
                      onClick={() => setCurrentConv(convIndex)}
                      sx={{ 
                        borderRadius: "4px",
                        py: 0.75,
                        px: 1.5,
                        mb: 0.5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: convIndex === currentConv ? themeOptions.background.selected : "transparent",
                        "&:hover": {
                          backgroundColor: convIndex === currentConv ? themeOptions.background.selected : themeOptions.background.hover
                        }
                      }}
                    >
                      <Typography 
                        noWrap 
                        sx={{ 
                          fontSize: "0.875rem", 
                          color: convIndex === currentConv ? themeOptions.text.primary : themeOptions.text.secondary,
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {conv.title}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuOpen(e, convIndex)}
                        sx={{ 
                          color: themeOptions.text.secondary, 
                          padding: 0.25,
                          visibility: convIndex === currentConv ? 'visible' : 'hidden',
                          '.MuiListItemButton-root:hover &': {
                            visibility: 'visible',
                          }
                        }}
                      >
                        <MoreIcon fontSize="small" />
                      </IconButton>
                    </ListItemButton>
                  );
                })}
              </>
            )}
          </Box>        
            
          <UserMenu />

          {/* Conversation menu */}
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                backgroundColor: themeOptions.background.menu,
                color: themeOptions.text.primary,
                minWidth: 120,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }
            }}
          >
            <MenuItem onClick={handleDeleteClick} sx={{ fontSize: "0.875rem" }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>
          
          {/* Confirm delete dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            PaperProps={{
              sx: {
                backgroundColor: themeOptions.background.dialog,
                color: themeOptions.text.primary,
                borderRadius: 2,
                minWidth: 300,
              }
            }}
          >
            <DialogTitle sx={{ fontSize: "1rem", fontWeight: 600 }}>Delete Conversation</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: themeOptions.text.secondary }}>
                Are you sure you want to delete this conversation? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
              <Button 
                onClick={handleDeleteCancel} 
                sx={{ color: themeOptions.text.secondary }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteConfirm} 
                variant="contained"
                sx={{
                  backgroundColor: themeOptions.button.danger,
                  "&:hover": {
                    backgroundColor: themeOptions.button.dangerHover,
                  }
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          
          {/* Confirm clear all dialog */}
          <Dialog
            open={deleteAllDialogOpen}
            onClose={handleClearAllCancel}
            PaperProps={{
              sx: {
                backgroundColor: themeOptions.background.dialog,
                color: themeOptions.text.primary,
                borderRadius: 2,
                minWidth: 300,
              }
            }}
          >
            <DialogTitle sx={{ fontSize: "1rem", fontWeight: 600 }}>Clear All Conversations</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: themeOptions.text.secondary }}>
                Are you sure you want to delete all conversations? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
              <Button 
                onClick={handleClearAllCancel} 
                sx={{ color: themeOptions.text.secondary }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleClearAllConfirm} 
                variant="contained"
                sx={{
                  backgroundColor: themeOptions.button.danger,
                  "&:hover": {
                    backgroundColor: themeOptions.button.dangerHover,
                  }
                }}
              >
                Clear All
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Slide>
  );
};

export default Sidebar;