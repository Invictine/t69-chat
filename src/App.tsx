import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import { UserPreferencesProvider } from './context/UserPreferencesContext';
import Chat from './pages/Chat';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Settings from './pages/Settings/Settings';
import './App.css';


const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}

const App: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider>
      <UserPreferencesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatProvider>
                    <Chat />
                  </ChatProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <ChatProvider>
                    <Settings />
                  </ChatProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        </UserPreferencesProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default App;