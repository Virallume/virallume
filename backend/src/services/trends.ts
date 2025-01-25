interface TrendsResponse {
  success: boolean;
  data?: string[];
  error?: string;
}

export async function fetchTrends(): Promise<TrendsResponse> {
  try {
    const response = await fetch('https://api.rapidapi.com/trends', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
        'X-RapidAPI-Host': 'api.rapidapi.com'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch trends');
    }

    return {
      success: true,
      data: data.trends
    };
  } catch (error) {
    console.error('RapidAPI error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch trends'
    };
  }
}
