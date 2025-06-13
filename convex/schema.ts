import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversations: defineTable({
    title: v.optional(v.string()),
    userId: v.string(), // Clerk user ID
    messages: v.optional(v.array(v.object({
      id: v.string(),
      role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
      content: v.string(),
      timestamp: v.optional(v.string())
    }))),
    createdAt: v.optional(v.number()), // Changed from string to number
    updatedAt: v.optional(v.number())  // Changed from string to number
  })
    .index("by_user", ["userId"])
    .index("by_user_updated", ["userId", "updatedAt"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    content: v.string(),
    sender: v.union(v.literal("user"), v.literal("bot")),
    timestamp: v.number(),
    model: v.optional(v.string()), // AI model used for bot messages
    tokens: v.optional(v.number()), // token count for analytics
  })
    .index("by_conversation", ["conversationId"])
    .index("by_conversation_timestamp", ["conversationId", "timestamp"]),
  
  // Add the userPreferences table
  userPreferences: defineTable({
    userId: v.string(),
    username: v.optional(v.string()),
    occupation: v.optional(v.string()),
    traits: v.optional(v.array(v.string())),
    aboutText: v.optional(v.string()),
    hidePersonalInfo: v.optional(v.boolean()),
    disableThematicBreaks: v.optional(v.boolean()),
    statsForNerds: v.optional(v.boolean()),
    mainFont: v.optional(v.string()),
    codeFont: v.optional(v.string()),
    boringMode: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number()
  })
  .index("by_user", ["userId"])
});
