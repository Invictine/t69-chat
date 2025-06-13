import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { Id } from "../_generated/dataModel";

// Delete selected conversations
export const deleteConversations = mutation({
  args: { ids: v.array(v.id("conversations")) },
  handler: async (ctx, args) => {
    const { ids } = args;
    
    // Make sure user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: User not authenticated");
    }
    
    const userId = identity.subject;
    
    // Delete each conversation if it belongs to the user
    const results = await Promise.all(
      ids.map(async (id) => {
        const conversation = await ctx.db.get(id);
        
        // Verify conversation exists and belongs to current user
        if (conversation && conversation.userId === userId) {
          await ctx.db.delete(id);
          return { success: true, id };
        } else {
          return { success: false, id, reason: "Not found or unauthorized" };
        }
      })
    );
    
    return results;
  }
});

// Export conversations for backup
export const exportConversations = mutation({
  args: { ids: v.array(v.id("conversations")) },
  handler: async (ctx, args) => {
    const { ids } = args;
    
    // Make sure user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: User not authenticated");
    }
    
    const userId = identity.subject;
    
    // Get all conversations that belong to the user
    const conversations = await Promise.all(
      ids.map(async (id) => {
        const conversation = await ctx.db.get(id);
        
        // Verify conversation exists and belongs to current user
        if (conversation && conversation.userId === userId) {
          return { ...conversation, _id: id };
        }
        return null;
      })
    );
    
    // Filter out null values (conversations that weren't found or don't belong to user)
    return conversations.filter(Boolean);
  }
});

// Import conversations from backup
export const importConversations = mutation({
  args: { conversations: v.any() },
  handler: async (ctx, args) => {
    const { conversations } = args;
    
    // Make sure user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: User not authenticated");
    }
    
    const userId = identity.subject;
    
    // Process array format
    if (Array.isArray(conversations)) {
      const results = await Promise.all(
        conversations.map(async (conv) => {
          // strip any incoming _id
          const { _id, ...convData } = conv;
          const conversationData = {
            ...convData,
            userId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          const newId = await ctx.db.insert("conversations", conversationData);
          return { success: true, oldId: _id, newId };
        })
      );
      return results;
    }
    // Process object format (legacy format)
// …
else if (typeof conversations === "object" && conversations !== null) {
  const results = [];
  for (const [key, conv] of Object.entries(conversations)) {
    if (typeof conv === "object" && conv !== null) {
      const conversationData = {
        // drop any incoming _id
        ...conv as Omit<typeof conv, "_id">,
        userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const newId = await ctx.db.insert("conversations", conversationData);
      results.push({ success: true, oldId: key, newId });
    }
  }
  return results;
}
    
    throw new Error("Invalid import format: Expected array or object of conversations");
  }
});

// Restore old chats
export const restoreOldChats = mutation({
  handler: async (ctx) => {
    // Make sure user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: User not authenticated");
    }
    
    const userId = identity.subject;
    
    // Here you would implement the logic to restore old chats
    // This is a placeholder implementation
    return { success: true, message: "Restored old chats successfully" };
  }
});