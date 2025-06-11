import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useChatContext } from '../../context/ChatContext';
import styles from '../../styles/modules/components/Chat.module.css';

const MessageList: React.FC = () => {
  const { conversations, currentConv } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  return (
    <Box p={3}>
      {conversations[currentConv].messages.map((msg, i) => (
        <Box
          key={i}
          display="flex"
          justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
          mb={1.5}
        >
          <Box
            className={`${styles.chatBubble} ${
              msg.sender === "user" ? styles.userBubble : styles.botBubble
            }`}
          >
            <Typography variant="body1">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </Typography>
          </Box>
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;