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
  deleteConversation: (index: number) => void;
  clearAllConversations: () => void;
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
  
  // Load conversations from localStorage when component mounts
  useEffect(() => {
    if (user) {
      const savedConversations = localStorage.getItem(`t69_conversations_${user.id}`);
      const savedCurrentConv = localStorage.getItem(`t69_currentConv_${user.id}`);
      
      if (savedConversations) {
        const parsedConversations = JSON.parse(savedConversations) as Conversation[];
        setConversations(parsedConversations);
      } else {
        // Initialize with default conversations if none saved
        setConversations([
          { id: '1', title: 'How to build a website', messages: [], userId: user.id },
          { id: '2', title: 'AI explained', messages: [], userId: user.id },
        ]);
      }
      
      if (savedCurrentConv) {
        const parsedCurrentConv = parseInt(savedCurrentConv);
        setCurrentConv(parsedCurrentConv);
      }
    }
  }, [user?.id]);

  // Update messages whenever the current conversation changes
  useEffect(() => {
    if (conversations.length > 0 && currentConv < conversations.length) {
      setMessages(conversations[currentConv]?.messages || []);
    } else {
      setMessages([]);
    }
  }, [conversations, currentConv]);
  
  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (user && conversations.length > 0) {
      localStorage.setItem(`t69_conversations_${user.id}`, JSON.stringify(conversations));
      localStorage.setItem(`t69_currentConv_${user.id}`, currentConv.toString());
    }
  }, [conversations, currentConv, user?.id]);
  
  const isEmptyChat = messages.length === 0;

  // Update the updateConversationTitle function
  const updateConversationTitle = (index: number, firstMessage: string) => {
    // Create a more descriptive title from the first message
    // Remove punctuation and trim extra spaces
    let cleanMessage = firstMessage.replace(/[?.!,;:]/g, '').trim();
    
    // If it's a question, keep the question format
    const isQuestion = firstMessage.trim().endsWith('?');
    
    // Create title - either first few words or truncate
    let title;
    if (isQuestion) {
      // For questions, keep the question format
      title = cleanMessage.length > 40 ? `${cleanMessage.substring(0, 37)}...` : cleanMessage;
    } else {
      // For statements, extract main topic
      const words = cleanMessage.split(' ');
      if (words.length <= 5) {
        title = cleanMessage;
      } else {
        // Take first 4-5 words
        title = words.slice(0, 4).join(' ') + '...';
      }
    }
    
    // Update the conversation title
    setConversations(prev => 
      prev.map((conv, i) => 
        i === index ? { ...conv, title } : conv
      )
    );
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    // Update messages array
    const newUserMessages = [...messages, userMessage];
    setMessages(newUserMessages);
    
    // Update conversation with new messages
    const updatedConversations = [...conversations];
    if (updatedConversations[currentConv]) {
      updatedConversations[currentConv].messages = newUserMessages;
      
      // If this is the first message in the conversation, update the title
      if (updatedConversations[currentConv].messages.length === 1) {
        // Immediately update title based on first message
        updateConversationTitle(currentConv, userMessage.content);
        
        // A more specific title for "Why is React the last framework?"
        if (userMessage.content.toLowerCase().includes('react') && 
            userMessage.content.toLowerCase().includes('framework')) {
          setConversations(prev => 
            prev.map((conv, i) => 
              i === currentConv ? { ...conv, title: "React Framework Discussion" } : conv
            )
          );
        }
      }
      
      setConversations(updatedConversations);
    }
    
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
    
    // Add bot message to UI
    const withBotMessage = [...newUserMessages, botMessage];
    setMessages(withBotMessage);
    
    // Also update the conversation
    if (updatedConversations[currentConv]) {
      updatedConversations[currentConv].messages = withBotMessage;
      setConversations(updatedConversations);
    }

    try {
      let fullResponse = '';
      
      await llmService.generateResponse(
        newUserMessages, 
        selectedModel,
        (chunk: string) => {
          fullResponse += chunk;
          
          // Update both local messages and the conversation
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId 
                ? { ...msg, content: fullResponse }
                : msg
            )
          );
          
          // Update conversation in state
          setConversations(prevConvs => {
            const newConvs = [...prevConvs];
            if (newConvs[currentConv]) {
              newConvs[currentConv].messages = newConvs[currentConv].messages.map(msg => 
                msg.id === botMessageId 
                  ? { ...msg, content: fullResponse }
                  : msg
              );
            }
            return newConvs;
          });
        }
      );
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate response';
      
      // Update both local messages and conversation with error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, content: `Error: ${errorMessage}. Please check your API keys in the environment variables.` }
            : msg
        )
      );
      
      setConversations(prevConvs => {
        const newConvs = [...prevConvs];
        if (newConvs[currentConv]) {
          newConvs[currentConv].messages = newConvs[currentConv].messages.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, content: `Error: ${errorMessage}. Please check your API keys.` }
              : msg
          );
        }
        return newConvs;
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to handle conversation switching
  const handleSetCurrentConv = (index: number) => {
    if (index < conversations.length) {
      setCurrentConv(index);
      setMessages(conversations[index].messages || []);
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
    
    // Add new conversation at the beginning
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
  
  const deleteConversation = (index: number) => {
    const newConversations = conversations.filter((_, i) => i !== index);
    setConversations(newConversations);
    
    // If the current conversation is deleted, switch to the first one
    if (currentConv === index) {
      if (newConversations.length > 0) {
        setCurrentConv(0);
        setMessages(newConversations[0].messages || []);
      } else {
        setCurrentConv(0);
        setMessages([]);
      }
    } 
    // If a conversation before the current one is deleted, adjust the index
    else if (index < currentConv) {
      setCurrentConv(currentConv - 1);
    }
  };
  
  const clearAllConversations = () => {
    setConversations([]);
    setCurrentConv(0);
    setMessages([]);
    if (user) {
      localStorage.removeItem(`t69_conversations_${user.id}`);
    }
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
    setCurrentConv: handleSetCurrentConv,
    handleNewConversation,
    handleSuggestionClick,
    setSelectedModel,
    deleteConversation,
    clearAllConversations,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};