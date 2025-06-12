# T69 Chat - Multi-LLM Chat Interface

A modern chat interface that supports multiple Large Language Models (LLMs) including OpenAI GPT models and Google Gemini models.

## Features

- 🤖 Multiple LLM Support (OpenAI GPT-4o, GPT-4o Mini, Google Gemini)
- 💬 Real-time streaming responses
- 🎨 Modern dark-themed UI
- 📱 Responsive design
- 🔄 Model switching during conversation
- 💾 Conversation management

## Setup Instructions

### 1. Install Dependencies

```bash
cd t69-chat
npm install
```

### 2. Configure API Keys

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API keys:
   ```env
   # OpenAI API Key - Get from https://platform.openai.com/api-keys
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   
   # Google AI API Key - Get from https://makersuite.google.com/app/apikey
   VITE_GOOGLE_API_KEY=your_google_api_key_here
   ```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Getting API Keys

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the key to your `.env` file

### Google AI API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## Available Models

- **GPT-4o** - OpenAI's flagship model
- **GPT-4o Mini** - Faster, cost-effective OpenAI model
- **Gemini 2.0 Flash** - Google's latest experimental model
- **Gemini 1.5 Flash** - Google's production-ready model

## Usage

1. Select your preferred model from the dropdown in the chat input
2. Type your message and press Enter or click the send button
3. Watch as the AI responds in real-time with streaming
4. Switch models anytime during the conversation
5. Create new conversations using the "New Chat" button

## Technologies Used

- **React 18** with TypeScript
- **Material-UI (MUI)** for components
- **Vite** for build tooling
- **OpenAI API** for GPT models
- **Google Generative AI** for Gemini models

## Security Note

⚠️ **Important**: This application uses API keys in the browser (client-side). For production use, consider implementing a backend proxy to keep API keys secure.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Contributing

Feel free to open issues and pull requests to improve the application!
