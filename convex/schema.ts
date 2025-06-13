import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversations: defineTable({
    title: v.string(),
    userId: v.string(), // Clerk user ID
    createdAt: v.number(), // timestamp
    updatedAt: v.number(), // timestamp
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
});
