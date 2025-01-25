interface DeepSeekResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export async function generateContent(prompt: string): Promise<DeepSeekResponse> {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat-v3',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate content');
    }

    return {
      success: true,
      data: data.choices[0].message.content
    };
  } catch (error) {
    console.error('DeepSeek API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate content'
    };
  }
}
