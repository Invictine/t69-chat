import React from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
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
    "How does AI work?",
    "Are black holes real?",
    "How many Rs are in the word \"strawberry\"?",
    "What is the meaning of life?"
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 8 },
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        color: "#fff"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 4,
          color: "#fff"
        }}
      >
        {user
          ? `How can I help you, ${user.firstName || 'there'}?`
          : "How can I help you?"}
      </Typography>

      {/* category pills */}
      <Box sx={{ display: "flex", gap: 2, mb: 6 }}>
        {categories.map((cat, i) => (
          <Button
            key={i}
            variant="outlined"
            size="small"
            startIcon={cat.icon}
            onClick={() => handleSuggestionClick(cat.name)}
            sx={{
              borderRadius: 20,
              borderColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              textTransform: "none",
              background: "rgba(255,255,255,0.05)",
              transition: "background 0.2s",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.1)"
              }
            }}
          >
            {cat.name}
          </Button>
        ))}
      </Box>

      {/* suggestion list */}
      <List sx={{ width: "100%" }}>
        {suggestions.map((text, i) => (
          <React.Fragment key={i}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleSuggestionClick(text)}
                sx={{
                  px: 0,
                  py: 1,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
                }}
              >
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    variant: 'body1',
                    color: '#d4d4d8'
                  }}
                />
              </ListItemButton>
            </ListItem>
            {i < suggestions.length - 1 && (
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default WelcomeScreen;