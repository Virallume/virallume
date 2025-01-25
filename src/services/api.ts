import { API_ENDPOINTS } from '../constants';

interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Mock transformation function
const mockTransformText = (text: string): string => {
  // Add hashtags
  const hashtags = ['#trending', '#viral', '#socialmedia'];
  // Add emojis
  const emojis = ['🔥', '✨', '💫'];
  // Transform the text
  return `${text}\n\n${emojis.join(' ')}\n\n${hashtags.join(' ')}`;
};

export const transformText = async (text: string, preferences: any): Promise<APIResponse<string>> => {
  try {
    // Use mock transformation instead of API call
    const transformedText = mockTransformText(text);
    
    return {
      success: true,
      data: transformedText
    };
  } catch (error) {
    console.error('Transform text error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to transform text'
    };
  }
};

export const getTrends = async (): Promise<APIResponse<string[]>> => {
  try {
    // Return mock trends
    return {
      success: true,
      data: ['#trending', '#viral', '#socialmedia']
    };
  } catch (error) {
    console.error('Get trends error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch trends'
    };
  }
};
