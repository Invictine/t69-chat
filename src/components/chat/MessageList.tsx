import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  useTheme, 
  useMediaQuery, 
  IconButton, 
  Fade
} from '@mui/material';
import { useChatContext } from '../../context/ChatContext';
import Message from './Message';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MessageList: React.FC = () => {
  const { messages, isGenerating, conversations, currentConv } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior,
        block: 'end'
      });
    }
  };
  
  // Handle scroll events to show/hide scroll to bottom button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    // Show button when scrolled up more than 300px from bottom
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 300;
    setShowScrollButton(isScrolledUp);
  };
  
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  useEffect(() => {
    // Small delay to ensure DOM has updated
    const timeoutId = setTimeout(() => {
      scrollToBottom(messages.length > 1 ? 'smooth' : 'auto');
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Current conversation title
  const currentTitle = conversations[currentConv]?.title || 'New conversation';

  return (
    <Box
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        // Don't add padding here - let ChatInput handle its own positioning
      }}
    >
      <Box
        ref={messagesContainerRef}
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          padding: { xs: '16px 12px', sm: '16px', md: '20px' },
          gap: { xs: 3, sm: 4 },
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent',
          // Add padding at bottom to make room for input area
          paddingBottom: '0',
        }}
      >
        <Box 
          sx={{ 
            maxWidth: { xs: '100%', sm: '650px', md: '750px' },
            mx: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2.5, sm: 3.5 },
            pb: 10
          }}
        >
          {messages.length === 0 && (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%', 
                opacity: 0.8,
                minHeight: '70vh',
              }}
            >
              <Typography variant="h6" sx={{ color: '#9ca3af', mb: 1 }}>
                {currentTitle}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af', textAlign: 'center' }}>
                Start a conversation by typing a message below
              </Typography>
            </Box>
          )}
          
          {messages.map((message, index) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                color: message.sender === 'user' ? '#fff' : '#000',
              }}
            >
              <Message
                message={message}
                isGenerating={
                  isGenerating &&
                  index === messages.length - 1 &&
                  message.sender === 'bot'
                }
                // only give bot messages a feedback handler
                onFeedback={
                  message.sender === 'bot'
                    ? (id, type) => {
                        console.log(`Feedback for message ${id}: ${type}`);
                      }
                    : undefined
                }
                previousMessage={index > 0 ? messages[index - 1] : null}
              />
            </Box>
          ))}
          
          {isGenerating && messages.length === 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={20} sx={{ color: '#9ca3af', mr: 1 }} />
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                Generating response...
              </Typography>
            </Box>
          )}
          
          {/* Empty div to help with scrolling to bottom */}
          <div ref={messagesEndRef} style={{ padding: '1px' }} />
        </Box>
      </Box>
      
      {/* Scroll to bottom button - positioned above the input area */}
      <Fade in={showScrollButton}>
        <IconButton
          onClick={() => scrollToBottom()}
          sx={{
            position: 'absolute',
            bottom: 90, // Position above input area
            right: { xs: 16, md: 24 },
            backgroundColor: 'rgba(122, 0, 70, 0.7)',
            color: 'white',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(122, 0, 70, 0.9)',
            },
            zIndex: 10,
            width: 40,
            height: 40,
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Fade>
    </Box>
  );
};

export default MessageList;