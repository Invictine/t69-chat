import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { type Message, type LLMModel, AVAILABLE_MODELS } from '../types/index.ts';
import { llmService } from '../services/llmService';

// Define conversation type
interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  userId?: string;
}

interface ChatContextType {
  messages: Message[];
  input: string;
  isEmptyChat: boolean;
  conversations: Conversation[];
  currentConv: number;
  selectedModel: LLMModel;
  isGenerating: boolean;
  setInput: (input: string) => void;
  handleSend: () => void;
  setCurrentConv: (index: number) => void;
  handleNewConversation: () => void;
  handleSuggestionClick: (suggestion: string) => void;
  setSelectedModel: (model: LLMModel) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConv, setCurrentConv] = useState(0);
  const [selectedModel, setSelectedModel] = useState<LLMModel>(AVAILABLE_MODELS[2]); // Default to Gemini 2.0 Flash
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Initialize conversations when user is loaded
  useEffect(() => {
    if (user && conversations.length === 0) {
      setConversations([
        { id: '1', title: 'How to build a website', messages: [], userId: user.id },
        { id: '2', title: 'AI explained', messages: [], userId: user.id },
      ]);
    }
  }, [user, conversations.length]);
  
  const isEmptyChat = messages.length === 0;

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsGenerating(true);

    // Create a placeholder bot message for streaming
    const botMessageId = (Date.now() + 1).toString();
    const botMessage: Message = {
      id: botMessageId,
      content: '',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, botMessage]);

    try {
      let fullResponse = '';
      
      await llmService.generateResponse(
        newMessages, 
        selectedModel,
        (chunk: string) => {
          fullResponse += chunk;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId 
                ? { ...msg, content: fullResponse }
                : msg
            )
          );
        }
      );
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate response';
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, content: `Error: ${errorMessage}. Please check your API keys in the environment variables.` }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };
  const handleNewConversation = () => {
    // Create a new conversation
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New conversation',
      messages: [],
      userId: user?.id
    };
    
    setConversations([newConversation, ...conversations]);
    setCurrentConv(0);
    setMessages([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      handleSend();
    }, 100);
  };
  const value = {
    messages,
    input,
    isEmptyChat,
    conversations,
    currentConv,
    selectedModel,
    isGenerating,
    setInput,
    handleSend,
    setCurrentConv,
    handleNewConversation,
    handleSuggestionClick,
    setSelectedModel,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};