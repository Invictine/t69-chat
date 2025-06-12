# Quick Demo Setup (For Testing Only)

To quickly test the authentication without setting up Clerk:

1. Use this demo Clerk key (for development only):
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsuZXhhbXBsZS5jb20k
```

2. This will show the Clerk login form, but won't actually authenticate
3. For real authentication, follow the full setup in CLERK_SETUP.md

## Full Production Setup

For a real application:
1. Create account at https://clerk.com
2. Create new application  
3. Get your real publishable key
4. Add to .env file
5. Configure sign-in methods in Clerk dashboard

The app is designed to work seamlessly with any Clerk configuration!
