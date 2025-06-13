import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new conversation
export const createConversation = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("conversations", {
      title: args.title,
      userId: args.userId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get all conversations for a user
export const getUserConversations = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_user_updated", (q) => q.eq("userId", args.userId))
      .order("desc") // Most recently updated first
      .collect();
  },
});

// Update conversation title
export const updateConversationTitle = mutation({
  args: {
    conversationId: v.id("conversations"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      title: args.title,
      updatedAt: Date.now(),
    });
  },
});

// Delete a conversation
export const deleteConversation = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    // First, delete all messages in the conversation
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .collect();
    
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }
    
    // Then delete the conversation
    await ctx.db.delete(args.conversationId);
  },
});

// Delete all conversations for a user
export const deleteAllUserConversations = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    for (const conversation of conversations) {
      // Delete all messages in each conversation
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_conversation", (q) => q.eq("conversationId", conversation._id))
        .collect();
      
      for (const message of messages) {
        await ctx.db.delete(message._id);
      }
      
      // Delete the conversation
      await ctx.db.delete(conversation._id);
    }
  },
});

// Update conversation timestamp (when a new message is added)
export const touchConversation = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      updatedAt: Date.now(),
    });
  },
});
