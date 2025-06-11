import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  CssBaseline,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import "@fontsource/inter";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#121212",
    },
    primary: {
      main: "#007aff" // iMessage blue
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#1c1c1e",
          borderRadius: "20px",
        },
      },
    },
  },
});

const ChatGPTClone: React.FC = () => {
  const [messages, setMessages] = useState<Message[][]>([[{ sender: "bot", content: "Hello! How can I help you today?" }]]);
  const [currentConv, setCurrentConv] = useState(0);
  const [input, setInput] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages];
    newMessages[currentConv].push({ sender: "user", content: input });
    newMessages[currentConv].push({ sender: "bot", content: `Echo: ${input}` });
    setMessages(newMessages);
    setInput("");
  };

  const handleNewConversation = () => {
    setMessages([...messages, [{ sender: "bot", content: "New conversation started." }]]);
    setCurrentConv(messages.length);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" height="100vh" width="100vw">
        <Drawer
          anchor="left"
          open
          variant="persistent"
          sx={{
            width: 300,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 300,
              boxSizing: "border-box",
              borderRight: "1px solid #333",
              backgroundColor: "#1c1c1e",
            },
          }}
        >
          <Box p={2} display="flex" flexDirection="column" height="100%">
            <Button variant="contained" fullWidth onClick={handleNewConversation} sx={{ mb: 2 }}>
              New Chat
            </Button>
            <List sx={{ overflowY: "auto" }}>
              {messages.map((_, index) => (
                <ListItem
                  button
                  key={index}
                  selected={index === currentConv}
                  onClick={() => setCurrentConv(index)}
                >
                  <ListItemText primary={`Conversation ${index + 1}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box flexGrow={1} display="flex" flexDirection="column" height="100vh">
          <Box
            p={2}
            sx={{ bgcolor: "#1c1c1e", borderBottom: "1px solid #333" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">T69 Chat</Typography>
          </Box>

          <Box flex={1} overflow="auto" p={3} display="flex" flexDirection="column">
            {messages[currentConv].map((msg, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
                mb={1.5}
              >
                <Box
                  sx={{
                    maxWidth: "65%",
                    px: 2,
                    py: 1.25,
                    borderRadius: 3,
                    backgroundColor: msg.sender === "user" ? "#0a84ff" : "#3a3a3c",
                    color: "white",
                    borderTopLeftRadius: msg.sender === "user" ? 18 : 6,
                    borderTopRightRadius: msg.sender === "user" ? 6 : 18,
                    fontSize: "1rem",
                    lineHeight: 1.4,
                  }}
                >
                  <Typography variant="body1">{msg.content}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box p={2} display="flex" gap={1} borderTop="1px solid #333" alignItems="center">
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button variant="contained" onClick={handleSend} sx={{ height: "56px", borderRadius: "16px" }}>
              <Send />
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatGPTClone;
