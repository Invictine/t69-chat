import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import type { Message as MessageType } from '../../types/index.ts';

interface MessageProps {
  message: MessageType;
  isGenerating?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isGenerating = false }) => {
  const isUser = message.sender === 'user';
  
  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        width: '100%'
      }}
    >
      <Box 
        sx={{ 
          maxWidth: '85%',
          borderRadius: '12px',
          backgroundColor: isUser ? '#a78bfa' : 'transparent',
          padding: '12px 16px',
          color: isUser ? '#fff' : '#e4e4e7',
          boxShadow: isUser ? 'none' : '0px 1px 3px rgba(0,0,0,0.1)',
          position: 'relative'
        }}
      >
        <Typography
          sx={{
            fontSize: '0.95rem',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap'
          }}
        >
          {message.content}
        </Typography>
        
        {/* Show typing indicator for bot messages being generated */}
        {!isUser && isGenerating && message.content === '' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={12} sx={{ color: '#9ca3af' }} />
            <Typography sx={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic' }}>
              Thinking...
            </Typography>
          </Box>
        )}
        
        {/* Show cursor for streaming messages */}
        {!isUser && isGenerating && message.content !== '' && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              backgroundColor: '#9ca3af',
              marginLeft: '2px',
              animation: 'blink 1s infinite',
              '@keyframes blink': {
                '0%, 50%': { opacity: 1 },
                '51%, 100%': { opacity: 0 }
              }
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Message;