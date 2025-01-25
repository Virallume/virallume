export const MAX_FREE_USES = 5;
export const GUMROAD_PRODUCT_URL = 'https://gum.co/virallume';

export const FALLBACK_TRENDS = {
  tiktok: ['#fyp', '#viral', '#trending'],
  instagram: ['#instagood', '#photooftheday', '#love'],
  linkedin: ['#business', '#leadership', '#innovation']
} as const;

// API Endpoints
const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : 'https://virallume-api.onrender.com'; // We'll deploy to Render.com

export const API_ENDPOINTS = {
  TRANSFORM: `${BASE_URL}/api/generate`,
  TRENDS: `${BASE_URL}/api/trends`
} as const;

// API Keys
export const API_KEYS = {
  OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY',
  RAPIDAPI_KEY: 'YOUR_RAPIDAPI_KEY'
};

// Storage Keys
export const STORAGE_KEYS = {
  API_KEYS: 'api_keys',
  PREFERENCES: 'preferences',
  ANALYTICS: 'analytics'
} as const;

// Default Preferences
export const DEFAULT_PREFERENCES = {
  style: 'professional',
  emoji_frequency: 'moderate',
  hashtag_count: 3
} as const;

// Initialize API keys in Chrome storage
export const initializeAPIKeys = async () => {
  try {
    // Check if keys are already stored
    const result = await chrome.storage.local.get([STORAGE_KEYS.API_KEYS]);
    
    if (!result[STORAGE_KEYS.API_KEYS]) {
      // Store API keys if not present
      await chrome.storage.local.set({
        [STORAGE_KEYS.API_KEYS]: API_KEYS
      });
      console.log('API keys initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing API keys:', error);
  }
};

// Get API keys from storage
export const getAPIKeys = async () => {
  try {
    const result = await chrome.storage.local.get([STORAGE_KEYS.API_KEYS]);
    return result[STORAGE_KEYS.API_KEYS] || API_KEYS;
  } catch (error) {
    console.error('Error getting API keys:', error);
    return API_KEYS;
  }
};
