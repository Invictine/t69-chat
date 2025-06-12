# Clerk Authentication Setup Guide

## Step 1: Create a Clerk Account

1. Go to [Clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application in your Clerk dashboard
3. Choose your sign-in options (Email, Google, GitHub, etc.)

## Step 2: Get Your Clerk Keys

1. In your Clerk dashboard, go to "API Keys"
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Add it to your `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

## Step 3: Configure Sign-in Methods

In your Clerk dashboard:
1. Go to "User & Authentication" → "Email, Phone, Username"
2. Enable your preferred sign-in methods
3. Go to "User & Authentication" → "Social Connections" 
4. Enable social providers like Google, GitHub, etc.

## Step 4: Test Authentication

1. Start your development server: `npm run dev`
2. Open your browser to `http://localhost:5173`
3. You should see the Clerk sign-in form
4. Create an account or sign in
5. You'll be redirected to the chat interface

## Features Included

✅ **Sign-in/Sign-up** - Email and social authentication
✅ **User Management** - Profile management with Clerk
✅ **Protected Routes** - Chat only accessible when signed in
✅ **User Context** - Access user info throughout the app
✅ **Personalized Experience** - Welcome messages with user's name
✅ **User Conversations** - Conversations tied to user accounts

## Clerk Components Used

- `ClerkProvider` - Wraps the entire app
- `SignedIn` / `SignedOut` - Conditional rendering based on auth state
- `SignIn` - Pre-built sign-in form
- `UserButton` - User profile dropdown
- `useUser` - Hook to access user data

## Production Deployment

For production:
1. Create a production application in Clerk
2. Update your environment variables with production keys
3. Configure your production domain in Clerk settings
4. Set up webhooks if needed for user events
