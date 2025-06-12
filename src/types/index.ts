export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface LLMModel {
  id: string;
  name: string;
  provider: 'openai' | 'google' | 'anthropic';
  apiModel: string;
}

export const AVAILABLE_MODELS: LLMModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    apiModel: 'gpt-4o'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    apiModel: 'gpt-4o-mini'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini 2.0 Flash',
    provider: 'google',
    apiModel: 'gemini-2.0-flash-exp'
  },
  {
    id: 'gemini-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    apiModel: 'gemini-1.5-flash'
  }
];