import express from 'express';
import { fetchTrends } from '../services/trends';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await fetchTrends();
    res.json(result);
  } catch (error) {
    console.error('Trends fetch error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch trends'
    });
  }
});

export const trendsRouter = router;
