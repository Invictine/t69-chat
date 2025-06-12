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
        backgroundColor: "#121212",
        py: 0,
      }}
    >
        <Box 
          sx={{ 
            width: "100%",
            maxWidth: "780px",
            mx: "auto",
            p: 0.7,
            pb: 0,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#5a5a7c",
            border: "1px solid rgba(39, 39, 42, 0.5)",
            borderRadius: "16px 16px 0 0",
            zIndex: 0,
          }}
        >
      <Box 
        sx={{ 
          width: "100%",
          maxWidth: "780px",
          mx: "auto",
          px: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#18181b",
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
            color: isGenerating ? "#9ca3af" : "#d4d4d8",
            fontSize: "1rem",
            width: "100%",
            padding: "22px 12px 35px 12px",
            cursor: isGenerating ? "not-allowed" : "text",
          }}
        />
        
        {/* Bottom row: Controls */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.5,
          pb: 1.5,
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
                color: "#a1a1aa",
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
                color: "#a1a1aa",
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
              width: "28px",
              height: "28px",
              backgroundColor: input.trim() && !isGenerating ? "#7f57c2" : "#3f3f46",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: input.trim() && !isGenerating ? "pointer" : "not-allowed",
              opacity: input.trim() && !isGenerating ? 1 : 0.7,
              border: "none",
              outline: "none",
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: "16px", color: "#fff" }} />
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default ChatInput;