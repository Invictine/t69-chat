import React from 'react';
import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ClerkProvider, SignedIn, SignedOut, ClerkLoading } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import darkTheme from './styles/theme';
import { ChatProvider } from './context/ChatContext';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Settings from './pages/Settings';
import LoadingScreen from './components/common/LoadingScreen';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}

const App: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <ChatProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ClerkLoading>
              <LoadingScreen />
            </ClerkLoading>
            <SignedOut>
              <Login />
            </SignedOut>
            <SignedIn>
              <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Navigate to="/chat" replace />} />
              </Routes>
            </SignedIn>
          </ThemeProvider>
        </ChatProvider>
      </Router>
    </ClerkProvider>
  );
};

export default App;