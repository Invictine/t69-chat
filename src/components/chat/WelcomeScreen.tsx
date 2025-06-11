import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { Edit, Explore, Code, Psychology } from '@mui/icons-material';
import { useChatContext } from '../../context/ChatContext';

const WelcomeScreen: React.FC = () => {
  const { handleSuggestionClick } = useChatContext();
  
  const suggestions = [
    { text: "How does AI work?", icon: <Code /> },
    { text: "What is the meaning of life?", icon: <Explore /> },
    { text: "How many R's are in the word 'strawberry'?", icon: <Psychology /> },
    { text: "Are black holes real?", icon: <Explore /> },
  ];

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      minHeight: "100%",
      padding: "48px 24px",
      textAlign: "center"
    }}>
      <Typography variant="h4" sx={{ fontSize: "2rem", fontWeight: 600, mb: 4 }}>
        How can I help you?
      </Typography>
      
      <Box display="flex" justifyContent="center" gap={3} mb={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "50%" }}>
            <Edit />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#9ca3af", mt: 1 }}>Create</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "50%" }}>
            <Explore />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#9ca3af", mt: 1 }}>Explore</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "50%" }}>
            <Code />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#9ca3af", mt: 1 }}>Code</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "50%" }}>
            <Psychology />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#9ca3af", mt: 1 }}>Learn</Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1, maxWidth: 700 }}>
        {suggestions.map((suggestion, i) => (
          <Button
            key={i}
            onClick={() => handleSuggestionClick(suggestion.text)}
            variant="contained"
            sx={{
              backgroundColor: "rgba(42, 42, 58, 1)",
              color: "white",
              textTransform: "none",
              borderRadius: 1,
              '&:hover': {
                backgroundColor: "rgba(62, 62, 78, 1)",
              }
            }}
          >
            {suggestion.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default WelcomeScreen;