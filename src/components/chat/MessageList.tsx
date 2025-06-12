import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useChatContext } from '../../context/ChatContext';
import Message from './Message.tsx';


const MessageList: React.FC = () => {
  const { messages, isGenerating } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        padding: '16px',
        gap: 3,
        maxWidth: '800px',
        mx: 'auto',
        width: '100%'
      }}
    >      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={message} 
          isGenerating={isGenerating && index === messages.length - 1 && message.sender === 'bot'}
        />
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;