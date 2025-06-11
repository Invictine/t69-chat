import React from 'react';
import { Box, TextField, IconButton, CircularProgress, Button, Menu, MenuItem } from '@mui/material';
import { Search, AttachFile, ArrowUpward, KeyboardArrowDown, AutoAwesome } from '@mui/icons-material';
import { useChatContext } from '../../context/ChatContext';

const ChatInput: React.FC = () => {
  const { input, setInput, loading, handleSend } = useChatContext();
  const [modelMenuAnchor, setModelMenuAnchor] = React.useState<null | HTMLElement>(null);
  
  const handleOpenModelMenu = (event: React.MouseEvent<HTMLElement>) => {
    setModelMenuAnchor(event.currentTarget);
  };
  
  const handleCloseModelMenu = () => {
    setModelMenuAnchor(null);
  };

  return (
    <Box 
      sx={{ 
        padding: "0 16px",
        display: "flex",
        gap: "12px",
        backgroundColor: "#18181b",
        maxWidth: "800px",
        width: "100%",
        mx: "auto",
        mb: 3
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          width: "100%", 
          position: "relative",
          backgroundColor: "rgba(42, 42, 58, 0.8)",
          borderRadius: 2,
          overflow: "hidden"
        }}
      >
        <Button 
          onClick={handleOpenModelMenu}
          sx={{ 
            px: 1.5,
            color: "#9ca3af",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 0,
            typography: "body2",
            minWidth: "auto",
          }}
          endIcon={<KeyboardArrowDown fontSize="small" />}
        >
          <Box display="flex" alignItems="center">
            <AutoAwesome fontSize="small" sx={{ mr: 0.5, color: "#8e79f3" }} />
            Gemini 2.5 Flash
          </Box>
        </Button>
        <Menu
          anchorEl={modelMenuAnchor}
          open={Boolean(modelMenuAnchor)}
          onClose={handleCloseModelMenu}
        >
          <MenuItem onClick={handleCloseModelMenu}>Gemini 2.5 Flash</MenuItem>
          <MenuItem onClick={handleCloseModelMenu}>Claude 3 Opus</MenuItem>
          <MenuItem onClick={handleCloseModelMenu}>GPT-4o</MenuItem>
        </Menu>
        
        <TextField
          fullWidth
          variant="standard"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          multiline
          maxRows={5}
          InputProps={{
            disableUnderline: true,
            sx: { px: 1.5, py: 1 }
          }}
        />
        
        <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
          <IconButton size="small" sx={{ color: "#9ca3af" }}>
            <Search fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: "#9ca3af", mx: 0.5 }}>
            <AttachFile fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            sx={{ 
              backgroundColor: "#8e79f3", 
              borderRadius: 1,
              width: 36,
              height: 36,
              "&:hover": { backgroundColor: "#7a67d4" },
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : <ArrowUpward fontSize="small" />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInput;