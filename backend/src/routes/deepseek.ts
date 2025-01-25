import express from 'express';
import { generateContent } from '../services/deepseek';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { text, preferences } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Text is required'
      });
    }

    const prompt = `Transform this text into a ${preferences?.style || 'professional'} social media post. 
      Use ${preferences?.emoji_frequency || 'moderate'} emojis and include ${preferences?.hashtag_count || 3} relevant hashtags.
      Original text: ${text}`;

    const result = await generateContent(prompt);
    res.json(result);
  } catch (error) {
    console.error('DeepSeek generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate content'
    });
  }
});

export const deepseekRouter = router;
