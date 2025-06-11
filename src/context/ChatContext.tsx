import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Message {
  sender: "user" | "bot";
  content: string;
}

export interface Conversation {
  messages: Message[];
  title: string;
  date: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConv: number;
  isEmptyChat: boolean;
  input: string;
  loading: boolean;
  setInput: (input: string) => void;
  handleSend: () => Promise<void>;
  handleNewConversation: () => void;
  handleSuggestionClick: (text: string) => void;
  handleDeleteConversation: (index: number) => void;
  setCurrentConv: (index: number) => void;
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([
    { 
      messages: [], 
      title: "New Thread",
      date: new Date(),
    }
  ]);
  const [currentConv, setCurrentConv] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const isEmptyChat = conversations[currentConv].messages.length === 0;

  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem("conversations") || "[]");
    if (savedConversations.length) {
      // Convert date strings back to Date objects
      const conversations = savedConversations.map((conv: any) => ({
        ...conv,
        date: new Date(conv.date)
      }));
      setConversations(conversations);
    }
  }, []);

  useEffect(() => {
    // Save conversations but convert Dates to strings
    const serializableConversations = conversations.map(conv => ({
      ...conv,
      date: conv.date.toISOString()
    }));
    localStorage.setItem("conversations", JSON.stringify(serializableConversations));
  }, [conversations]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    
    const userMessage = input;
    setInput("");
    
    const newConversations = [...conversations];
    newConversations[currentConv].messages.push({ sender: "user", content: userMessage });
    
    // Update title if it's the first message
    if (newConversations[currentConv].messages.length === 1) {
      // Use first few words of message as title
      newConversations[currentConv].title = userMessage.split(' ').slice(0, 3).join(' ');
    }
    
    setConversations([...newConversations]);
    
    // Add initial bot message
    newConversations[currentConv].messages.push({ sender: "bot", content: "" });
    
    const botResponse = "This is a simulated streaming response from T69 Chat.";
    let streamedResponse = "";
    
    for (const char of botResponse) {
      streamedResponse += char;
      // Update the last message instead of adding new ones
      newConversations[currentConv].messages[newConversations[currentConv].messages.length - 1] = {
        sender: "bot",
        content: streamedResponse,
      };
      setConversations([...newConversations]);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    
    setLoading(false);
  };

  const handleNewConversation = () => {
    setConversations([
      ...conversations, 
      { 
        messages: [], 
        title: "New Thread", 
        date: new Date() 
      }
    ]);
    setCurrentConv(conversations.length);
  };
  
  const handleSuggestionClick = (text: string) => {
    setInput(text);
    handleSend();
  };
  
  const handleDeleteConversation = (index: number) => {
    const newConversations = [...conversations];
    newConversations.splice(index, 1);
    
    // If we deleted the last conversation, add a new empty one
    if (newConversations.length === 0) {
      newConversations.push({ 
        messages: [], 
        title: "New Thread", 
        date: new Date() 
      });
    }
    
    setConversations(newConversations);
    
    // If we deleted the current conversation, select another one
    if (index === currentConv) {
      setCurrentConv(Math.max(0, index - 1));
    } else if (index < currentConv) {
      setCurrentConv(currentConv - 1);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConv,
        isEmptyChat,
        input,
        loading,
        setInput,
        handleSend,
        handleNewConversation,
        handleSuggestionClick,
        handleDeleteConversation,
        setCurrentConv,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};