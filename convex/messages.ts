import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Add a new message to a conversation
export const addMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
    sender: v.union(v.literal("user"), v.literal("bot")),
    timestamp: v.number(),
    model: v.optional(v.string()),
    tokens: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      content: args.content,
      sender: args.sender,
      timestamp: args.timestamp,
      model: args.model,
      tokens: args.tokens,
    });
  },
});

// Get all messages for a conversation
export const getConversationMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_conversation_timestamp", (q) => 
        q.eq("conversationId", args.conversationId)
      )
      .order("asc") // Oldest first for chat display
      .collect();
  },
});

// Update a message (useful for streaming updates)
export const updateMessage = mutation({
  args: {
    messageId: v.id("messages"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      content: args.content,
    });
  },
});

// Delete a message
export const deleteMessage = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.messageId);
  },
});

// Get recent messages across all conversations for a user (for search/recent activity)
export const getUserRecentMessages = query({
  args: { 
    userId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    
    // First get user's conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    const conversationIds = conversations.map(c => c._id);
    
    // Get recent messages from all conversations
    const messages = [];
    for (const convId of conversationIds) {
      const convMessages = await ctx.db
        .query("messages")
        .withIndex("by_conversation_timestamp", (q) => q.eq("conversationId", convId))
        .order("desc")
        .take(limit);
      messages.push(...convMessages);
    }
    
    // Sort by timestamp and take the most recent
    return messages
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  },
});
