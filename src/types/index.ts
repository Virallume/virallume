export interface GeneratePostRequest {
  platform: 'tiktok' | 'instagram' | 'linkedin';
  preferences: {
    style: string;
    emoji_frequency: string;
    hashtag_count: number;
  };
}

export interface MessageResponse {
  text?: string;
  success?: boolean;
  post?: string;
  error?: string;
}

export interface AnalyticsEvent {
  event: string;
  timestamp: number;
  data: any;
}
