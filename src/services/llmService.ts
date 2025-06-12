import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { LLMModel, Message } from '../types/index';

// Initialize clients
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY || '');

export class LLMService {
  async generateResponse(
    messages: Message[], 
    model: LLMModel, 
    onStreamUpdate?: (chunk: string) => void
  ): Promise<string> {
    try {
      switch (model.provider) {
        case 'openai':
          return await this.generateOpenAIResponse(messages, model, onStreamUpdate);
        case 'google':
          return await this.generateGoogleResponse(messages, model, onStreamUpdate);
        default:
          throw new Error(`Unsupported provider: ${model.provider}`);
      }
    } catch (error) {
      console.error('LLM service error:', error);
      throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateOpenAIResponse(
    messages: Message[], 
    model: LLMModel, 
    onStreamUpdate?: (chunk: string) => void
  ): Promise<string> {
    const openAIMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.content
    }));

    if (onStreamUpdate) {
      const stream = await openai.chat.completions.create({
        model: model.apiModel,
        messages: openAIMessages,
        stream: true,
        max_tokens: 1000,
        temperature: 0.7
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          onStreamUpdate(content);
        }
      }
      return fullResponse;
    } else {
      const response = await openai.chat.completions.create({
        model: model.apiModel,
        messages: openAIMessages,
        max_tokens: 1000,
        temperature: 0.7
      });

      return response.choices[0]?.message?.content || 'No response generated';
    }
  }

  private async generateGoogleResponse(
    messages: Message[], 
    model: LLMModel, 
    onStreamUpdate?: (chunk: string) => void
  ): Promise<string> {
    const geminiModel = genAI.getGenerativeModel({ model: model.apiModel });
    
    // Convert message history to Gemini format
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.sender === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.content }]
    }));

    const lastMessage = messages[messages.length - 1];
    
    if (onStreamUpdate) {
      const chat = geminiModel.startChat({ history });
      const result = await chat.sendMessageStream(lastMessage.content);
      
      let fullResponse = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          fullResponse += chunkText;
          onStreamUpdate(chunkText);
        }
      }
      return fullResponse;
    } else {
      const chat = geminiModel.startChat({ history });
      const result = await chat.sendMessage(lastMessage.content);
      return result.response.text();
    }
  }
}

export const llmService = new LLMService();
