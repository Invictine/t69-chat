import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { type Message, type LLMModel, type Conversation, AVAILABLE_MODELS } from '../types/index.ts';
import { llmService } from '../services/llmService';
import type { Id } from '../../convex/_generated/dataModel';

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
  clearAllConversations: () => Promise<void>;
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
  const [currentConv, setCurrentConv] = useState(0);
  const [selectedModel, setSelectedModel] = useState<LLMModel>(AVAILABLE_MODELS[2]);
  const [isGenerating, setIsGenerating] = useState(false);
  // Convex queries and mutations
  const userConversations = useQuery(api.conversations.getUserConversations, 
    user ? { userId: user.id } : "skip"
  );
  const createConversation = useMutation(api.conversations.createConversation);
  const deleteConversationMutation = useMutation(api.conversations.deleteConversation);
  const deleteAllUserConversationsMutation = useMutation(api.conversations.deleteAllUserConversations);
  const updateConversationTitle = useMutation(api.conversations.updateConversationTitle);
  const touchConversation = useMutation(api.conversations.touchConversation);
  
  const addMessage = useMutation(api.messages.addMessage);
  const updateMessage = useMutation(api.messages.updateMessage);
  const conversationMessages = useQuery(api.messages.getConversationMessages,
    userConversations && userConversations.length > 0 && currentConv < userConversations.length
      ? { conversationId: userConversations[currentConv]._id }
      : "skip"
  );

  // Convert Convex data to local format
  const conversations: Conversation[] = (userConversations || []).map(conv => ({
    _id: conv._id,
    id: conv._id,
    title: conv.title,
    userId: conv.userId,
    // convert numeric timestamps to ISO strings to match Conversation type
    createdAt: conv.createdAt != null 
      ? new Date(conv.createdAt).toISOString() 
      : undefined,
    updatedAt: conv.updatedAt != null 
      ? new Date(conv.updatedAt).toISOString() 
      : undefined,
    messages: []
  }));
  // Load messages when conversation changes
  useEffect(() => {
    if (conversationMessages) {
      const formattedMessages: Message[] = conversationMessages.map(msg => ({
        _id: msg._id,
        id: msg._id,
        content: msg.content,
        role: msg.sender === 'user' ? 'user' : 'assistant',
        // ← ensure `sender` is set so MessageList can distinguish user vs bot
        sender: msg.sender,
        timestamp: new Date(msg.timestamp).toISOString(),
        model: msg.model,
        tokens: msg.tokens
      }));
      setMessages(formattedMessages);
    } else {
      setMessages([]);
    }
  }, [conversationMessages]);

  // Create initial conversation for new users
  useEffect(() => {
    if (user && userConversations !== undefined && userConversations.length === 0) {
      // User has no conversations, create a welcome conversation
      createConversation({
        title: 'Welcome to T69 Chat!',
        userId: user.id,
      });
    }
  }, [user, userConversations, createConversation]);

  const isEmptyChat = messages.length === 0;

  const updateConversationTitleFromMessage = async (conversationId: Id<"conversations">, firstMessage: string) => {
    let cleanMessage = firstMessage.replace(/[?.!,;:]/g, '').trim();
    const isQuestion = firstMessage.trim().endsWith('?');
    
    let title;
    if (isQuestion) {
      title = cleanMessage.length > 40 ? `${cleanMessage.substring(0, 37)}...` : cleanMessage;
    } else {
      const words = cleanMessage.split(' ');
      if (words.length <= 5) {
        title = cleanMessage;
      } else {
        title = words.slice(0, 4).join(' ') + '...';
      }
    }
    
    await updateConversationTitle({ conversationId, title });
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating || !user || !conversations.length) return;

    const currentConversationId = conversations[currentConv]._id;
    if (!currentConversationId) return;

    const userMessage: Message = {
      _id: Date.now().toString(),
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    // Add user message to Convex
    await addMessage({
      conversationId: currentConversationId,
      content: userMessage.content,
      sender: "user",
      timestamp: Date.now(),
    });

    // Update conversation timestamp
    await touchConversation({ conversationId: currentConversationId });

    // If this is the first message, update the title
    if (messages.length === 0) {
      await updateConversationTitleFromMessage(currentConversationId, userMessage.content);
    }

    setInput('');
    setIsGenerating(true);

    // Create placeholder bot message
    const botMessageId = await addMessage({
      conversationId: currentConversationId,
      content: '',
      sender: 'bot',
      timestamp: Date.now(),
      model: selectedModel.name,
    });

    try {
      let fullResponse = '';
      const allMessages = [...messages, userMessage];
      
      await llmService.generateResponse(
        allMessages, 
        selectedModel,
        (chunk: string) => {
          fullResponse += chunk;
          updateMessage({
            messageId: botMessageId,
            content: fullResponse,
          });
        }
      );
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate response';
      
      await updateMessage({
        messageId: botMessageId,
        content: `Error: ${errorMessage}. Please check your API keys.`,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSetCurrentConv = (index: number) => {
    if (index < conversations.length) {
      setCurrentConv(index);
    }
  };

  const handleNewConversation = async () => {
    if (!user) return;
    
    await createConversation({
      title: 'New conversation',
      userId: user.id,
    });
    
    setCurrentConv(0);
    setMessages([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      handleSend();
    }, 100);
  };
  
  const deleteConversation = async (index: number) => {
    if (index >= conversations.length) return;
    
    const conversationToDelete = conversations[index];
    if (!conversationToDelete._id) return;
    
    await deleteConversationMutation({ conversationId: conversationToDelete._id });
    
    if (currentConv === index) {
      if (conversations.length > 1) {
        setCurrentConv(0);
      } else {
        setCurrentConv(0);
        setMessages([]);
      }
    } else if (index < currentConv) {
      setCurrentConv(currentConv - 1);
    }
  };
  
  const clearAllConversations = async () => {
    if (!user) return;
    
    await deleteAllUserConversationsMutation({ userId: user.id });
    setCurrentConv(0);
    setMessages([]);
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
