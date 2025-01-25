import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface UsageCounterProps {
  current: number;
  max: number;
}

export const UsageCounter: React.FC<UsageCounterProps> = ({ current, max }) => {
  const progress = (current / max) * 100;
  const remaining = max - current;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Free Generations Remaining
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {remaining} left
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: remaining > 0 ? 'primary.main' : 'error.main',
            borderRadius: 4
          }
        }}
      />
      {remaining === 0 && (
        <Typography
          variant="caption"
          color="error"
          sx={{ display: 'block', mt: 1 }}
        >
          You've reached the free limit. Upgrade to continue generating posts.
        </Typography>
      )}
    </Box>
  );
};
