import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Create initial conversations for a new user
export const createInitialConversations = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Check if user already has conversations
    const existingConversations = await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    if (existingConversations.length > 0) {
      return { message: "User already has conversations" };
    }
    
    const now = Date.now();
    
    // Create sample conversations
    const conversations = [
      {
        title: "Welcome to T69 Chat!",
        userId: args.userId,
        createdAt: now - 86400000, // 1 day ago
        updatedAt: now - 86400000,
      },
      {
        title: "How to use multiple models",
        userId: args.userId,
        createdAt: now - 172800000, // 2 days ago
        updatedAt: now - 172800000,
      },
    ];
    
    const createdConversations = [];
    for (const conv of conversations) {
      const convId = await ctx.db.insert("conversations", conv);
      createdConversations.push(convId);
    }
    
    // Add welcome messages to the first conversation
    if (createdConversations.length > 0) {
      await ctx.db.insert("messages", {
        conversationId: createdConversations[0],
        content: "Welcome to T69 Chat! How can I help you today?",
        sender: "user",
        timestamp: now - 86400000,
      });
      
      await ctx.db.insert("messages", {
        conversationId: createdConversations[0],
        content: "Hello! Welcome to T69 Chat! 🎉\n\nI'm here to help you with anything you need. You can:\n\n- Ask questions about programming, technology, or any topic\n- Switch between different AI models (GPT-4o, Gemini, etc.) using the dropdown\n- Create multiple chat conversations using the 'New Chat' button\n- Search through your conversation history\n\nWhat would you like to explore today?",
        sender: "bot",
        timestamp: now - 86399000,
        model: "Gemini 2.0 Flash",
      });
    }
    
    return { 
      message: "Initial conversations created", 
      conversationIds: createdConversations 
    };
  },
});
