import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { SvgIconComponent } from '@mui/icons-material';

interface PlatformCardProps {
  platform: 'tiktok' | 'instagram' | 'linkedin';
  selected: boolean;
  onSelect: () => void;
}

interface PlatformConfig {
  icon: SvgIconComponent;
  label: string;
  color: string;
}

const platformConfig: Record<PlatformCardProps['platform'], PlatformConfig> = {
  tiktok: {
    icon: MusicNoteIcon,
    label: 'TikTok',
    color: '#000000'
  },
  instagram: {
    icon: InstagramIcon,
    label: 'Instagram',
    color: '#E1306C'
  },
  linkedin: {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    color: '#0077B5'
  }
};

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  selected,
  onSelect
}) => {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <Card
      sx={{
        cursor: 'pointer',
        width: 100,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: selected ? `2px solid ${config.color}` : 'none',
        '&:hover': {
          boxShadow: 3,
          transform: 'scale(1.05)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
      onClick={onSelect}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '8px !important'
        }}
      >
        <IconButton
          sx={{
            color: config.color,
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
          disableRipple
        >
          <Icon fontSize="large" />
        </IconButton>
        <Typography
          variant="caption"
          component="div"
          align="center"
          sx={{ mt: 1 }}
        >
          {config.label}
        </Typography>
      </CardContent>
    </Card>
  );
};
