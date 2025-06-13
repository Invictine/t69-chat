import React, { useState } from 'react';
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
  DialogActions
} from '@mui/material';
import { 
  Search, 
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useChatContext } from '../../context/ChatContext';
import UserMenu from '../user/UserMenu';

const Sidebar: React.FC = () => {
  const { 
    conversations, 
    currentConv, 
    setCurrentConv, 
    handleNewConversation,
    deleteConversation,
    clearAllConversations
  } = useChatContext();
  
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
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#181116",
        width: "256px"
      }}
    >
      <Box p={2} pb={1.5} display="flex" flexDirection="column" height="100%">
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleNewConversation} 
          sx={{
            backgroundColor: "#7a0046",
            color: "white",
            borderRadius: "6px",
            textTransform: "none",
            fontWeight: 500,
            padding: "10px 16px",
            mb: 2,
            "&:hover": {
              backgroundColor: "#640033",
            }
          }}
        >
          New Chat
        </Button>
        
        <Box 
          sx={{
            backgroundColor: "#1e1c2e",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            px: 1.5,
            py: 1,
            mb: 2
          }}
        >
          <Search sx={{ color: "#9ca3af", fontSize: 18, mr: 1 }} />
          <input
            placeholder="Search your threads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#9ca3af",
              fontSize: "0.875rem",
              width: "100%",
            }}
          />
        </Box>
        
        {conversations.length > 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, mb: 1 }}>
              <Typography variant="caption" sx={{ color: "#8b8b8b", fontSize: "0.7rem" }}>
                Recent Conversations
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ color: "#8b8b8b", fontSize: "0.7rem", cursor: "pointer" }}
                onClick={handleClearAllClick}
              >
                Clear All
              </Typography>
            </Box>
          </>
        )}
        
        <Box flex={1} sx={{ overflowY: "auto" }}>
          {filteredConversations.length === 0 && (
            <Typography 
              variant="body2" 
              sx={{ color: "#9ca3af", textAlign: "center", mt: 2, fontSize: "0.8rem" }}
            >
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </Typography>
          )}
          
          {filteredConversations.map((conv, index) => (
            <ListItemButton
              key={index}
              selected={index === currentConv}
              onClick={() => setCurrentConv(index)}
              sx={{ 
                borderRadius: "4px",
                py: 0.75,
                px: 1.5,
                mb: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: index === currentConv ? "rgba(255, 255, 255, 0.08)" : "transparent",
                "&:hover": {
                  backgroundColor: index === currentConv ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.04)"
                }
              }}
            >
              <Typography 
                noWrap 
                sx={{ 
                  fontSize: "0.875rem", 
                  color: index === currentConv ? "#ffffff" : "#9ca3af",
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {conv.title}
              </Typography>
              <IconButton 
                size="small" 
                onClick={(e) => handleMenuOpen(e, index)}
                sx={{ 
                  color: "#9ca3af", 
                  padding: 0.25,
                  visibility: index === currentConv ? 'visible' : 'hidden',
                  '.MuiListItemButton-root:hover &': {
                    visibility: 'visible',
                  }
                }}
              >
                <MoreIcon fontSize="small" />
              </IconButton>
            </ListItemButton>
          ))}
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
              backgroundColor: "#1e1c2e",
              color: "#d4d4d8",
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
              backgroundColor: "#1e1c2e",
              color: "#d4d4d8",
              borderRadius: 2,
              minWidth: 300,
            }
          }}
        >
          <DialogTitle sx={{ fontSize: "1rem", fontWeight: 600 }}>Delete Conversation</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#9ca3af" }}>
              Are you sure you want to delete this conversation? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button 
              onClick={handleDeleteCancel} 
              sx={{ color: "#9ca3af" }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              variant="contained"
              sx={{
                backgroundColor: "#e11d48",
                "&:hover": {
                  backgroundColor: "#be123c",
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
              backgroundColor: "#1e1c2e",
              color: "#d4d4d8",
              borderRadius: 2,
              minWidth: 300,
            }
          }}
        >
          <DialogTitle sx={{ fontSize: "1rem", fontWeight: 600 }}>Clear All Conversations</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#9ca3af" }}>
              Are you sure you want to delete all conversations? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button 
              onClick={handleClearAllCancel} 
              sx={{ color: "#9ca3af" }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleClearAllConfirm} 
              variant="contained"
              sx={{
                backgroundColor: "#e11d48",
                "&:hover": {
                  backgroundColor: "#be123c",
                }
              }}
            >
              Clear All
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Sidebar;