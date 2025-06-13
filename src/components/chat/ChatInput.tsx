import React from 'react';
import { Box, Typography } from '@mui/material';
import { useChatContext } from '../../context/ChatContext';
import LinkIcon from '@mui/icons-material/Link';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PublicIcon from '@mui/icons-material/Public';
import ModelSelector from './ModelSelector';

const ChatInput: React.FC = () => {
  const { input, setInput, handleSend, isGenerating } = useChatContext();

  return (
    <Box 
      sx={{ 
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: 'transparent',
        py: 0,
        px: 2,
      }}
    >
        <Box 
          sx={{ 
            width: "100%",
            maxWidth: "765px",
            mx: "auto",
            p: 0.8,
            pb: 0,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#271F2B",
            border: "1px solid rgba(39, 39, 42, 0.5)",
            borderRadius: "20px 20px 0 0",
            zIndex: 0,
          }}
        >
      <Box 
        sx={{ 
          width: "100%",
          maxWidth: "780px",
          mx: "auto",
          px: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2A2431",
          border: "1px solid rgba(39, 39, 42, 0.5)",
          borderRadius: "16px 16px 0 0",
          zIndex: 1,
        }}
      >        {/* Top row: Input field */}
        <input
          placeholder={isGenerating ? "Generating response..." : "Type your message here..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && !isGenerating && handleSend()}
          disabled={isGenerating}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: isGenerating ? "#9ca3af" : "#EEEDF0",
            
            fontSize: "1rem",
            width: "100%",
            padding: "18px 12px 40px 12px",
            cursor: isGenerating ? "not-allowed" : "text",
          }}
          
        />
        
        {/* Bottom row: Controls */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between",
          px: 0.5,
          pb: 1,
        }}>          {/* Left side controls */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Model selector */}
            <ModelSelector />
            
            {/* Search button with globe icon and text */}
            <Box
              component="button"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                color: "#DCC7D3",
                p: 0.5,
                mr: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PublicIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                <Typography sx={{ fontSize: "0.8rem" }}>Search</Typography>
              </Box>
            </Box>
            
            {/* Link/attachment button */}
            <Box
              component="button"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                color: "#DCC7D3",
                p: 0.5,
              }}
            >
              <LinkIcon sx={{ fontSize: "1.1rem" }} />
            </Box>
          </Box>
            {/* Right side: Submit button */}
          <Box
            component="button"
            onClick={() => input.trim() && !isGenerating && handleSend()}
            sx={{
              width: "32px",
              height: "32px",
              backgroundColor: input.trim() && !isGenerating ? "#7f57c2" : "#4C2039",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: input.trim() && !isGenerating ? "pointer" : "not-allowed",
              opacity: input.trim() && !isGenerating ? 1 : 0.7,
              border: "none",
              outline: "none",
              mr: 0.8,
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: "20px", color: "#ffff" }} />
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default ChatInput;