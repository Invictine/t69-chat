import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get user preferences
export const getUserPreferences = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Check if user preferences exist
    const preferences = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    
    return preferences || null;
  },
});

// Mutation to save user preferences
export const saveUserPreferences = mutation({
  args: { 
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
    boringMode: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    // Check if preferences already exist
    const existingPreferences = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    
    // Update or create preferences
    if (existingPreferences) {
      await ctx.db.patch(existingPreferences._id, {
        username: args.username ?? existingPreferences.username,
        occupation: args.occupation ?? existingPreferences.occupation,
        traits: args.traits ?? existingPreferences.traits,
        aboutText: args.aboutText ?? existingPreferences.aboutText,
        hidePersonalInfo: args.hidePersonalInfo ?? existingPreferences.hidePersonalInfo,
        disableThematicBreaks: args.disableThematicBreaks ?? existingPreferences.disableThematicBreaks,
        statsForNerds: args.statsForNerds ?? existingPreferences.statsForNerds,
        mainFont: args.mainFont ?? existingPreferences.mainFont,
        codeFont: args.codeFont ?? existingPreferences.codeFont,
        boringMode: args.boringMode ?? existingPreferences.boringMode,
        updatedAt: Date.now()
      });
      
      return { success: true, operation: "updated" };
    } else {
      // Create new preferences
      await ctx.db.insert("userPreferences", {
        userId: args.userId,
        username: args.username || "",
        occupation: args.occupation || "",
        traits: args.traits || [],
        aboutText: args.aboutText || "",
        hidePersonalInfo: args.hidePersonalInfo || false,
        disableThematicBreaks: args.disableThematicBreaks || false,
        statsForNerds: args.statsForNerds || false,
        mainFont: args.mainFont || "Proxima Vara",
        codeFont: args.codeFont || "Berkeley Mono",
        boringMode: args.boringMode || false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      
      return { success: true, operation: "created" };
    }
  },
});

// Function to load legacy data (placeholder)
export const loadLegacyData = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // This is where you'd implement loading data from a previous system
    // For now, we'll return a placeholder response
    return { success: true, message: "Legacy data loaded" };
  },
});