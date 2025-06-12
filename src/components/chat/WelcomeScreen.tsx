import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Create, Explore, Code, Psychology } from '@mui/icons-material';
import { useUser } from '@clerk/clerk-react';
import { useChatContext } from '../../context/ChatContext';

const WelcomeScreen: React.FC = () => {
  const { handleSuggestionClick } = useChatContext();
  const { user } = useUser();
  
  const categories = [
    { name: "Create", icon: <Create fontSize="small" /> },
    { name: "Explore", icon: <Explore fontSize="small" /> },
    { name: "Code", icon: <Code fontSize="small" /> },
    { name: "Learn", icon: <Psychology fontSize="small" /> }
  ];
  
  const suggestions = [
    "Where did Theo's moustache go??",
    "Why is Apple the best company in the world?",
    "How many R's are in the word \"strawberry\"?",
    "Why is React the last framework?"
  ];

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 8,
      height: "100%"
    }}>      <Typography 
        variant="h3" 
        sx={{ 
          fontSize: "2rem", 
          fontWeight: 600, 
          mb: 5,
          color: "#fff" 
        }}
      >
        {user ? `How can I help you, ${user.firstName || 'there'}?` : 'How can I help you?'}
      </Typography>
      
      <Box 
        sx={{ 
          display: "flex", 
          gap: 3, 
          mb: 6
        }}
      >
        {categories.map((category, i) => (
          <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button
              sx={{
                minWidth: "48px",
                height: "48px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "50%",
                mb: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }
              }}
            >
              {category.icon}
            </Button>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {category.name}
            </Typography>
          </Box>
        ))}
      </Box>
      
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          gap: 2
        }}
      >
        {suggestions.map((suggestion, i) => (
          <Button
            key={i}
            onClick={() => handleSuggestionClick(suggestion)}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "6px",
              color: "#fff",
              textTransform: "none",
              py: 1,
              px: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }
            }}
          >
            {suggestion}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default WelcomeScreen;