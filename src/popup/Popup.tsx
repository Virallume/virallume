import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  Button, 
  Typography, 
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { PlatformCard } from './components/PlatformCard';
import { UsageCounter } from './components/UsageCounter';
import { PaywallModal } from './components/PaywallModal';

const MAX_FREE_USES = 5;

export const Popup: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    // Get selected text from content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { type: 'GET_SELECTED_TEXT' }, (response) => {
        if (response?.text) {
          setSelectedText(response.text);
        }
      });
    });

    // Load usage count
    chrome.storage.local.get(['usageCount'], (result) => {
      setUsageCount(result.usageCount || 0);
    });
  }, []);

  const handleGenerate = async () => {
    if (!selectedText) {
      setError('No text selected');
      return;
    }

    if (usageCount >= MAX_FREE_USES) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GENERATE_POST',
        platform: selectedPlatform,
        text: selectedText
      });

      if (response.success) {
        // Update usage count
        const newCount = usageCount + 1;
        chrome.storage.local.set({ usageCount: newCount });
        setUsageCount(newCount);
        
        setNotification({
          show: true,
          message: 'Post generated successfully!',
          type: 'success'
        });
      } else {
        throw new Error(response.error);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setNotification({
      show: true,
      message: 'Copied to clipboard!',
      type: 'success'
    });
  };

  return (
    <Box sx={{ width: 400, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        ViralLume
      </Typography>

      <UsageCounter current={usageCount} max={MAX_FREE_USES} />

      {selectedText ? (
        <>
          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Selected text:
            </Typography>
            <Typography noWrap>{selectedText}</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <PlatformCard
              platform="tiktok"
              selected={selectedPlatform === 'tiktok'}
              onSelect={() => setSelectedPlatform('tiktok')}
            />
            <PlatformCard
              platform="instagram"
              selected={selectedPlatform === 'instagram'}
              onSelect={() => setSelectedPlatform('instagram')}
            />
            <PlatformCard
              platform="linkedin"
              selected={selectedPlatform === 'linkedin'}
              onSelect={() => setSelectedPlatform('linkedin')}
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleGenerate}
            disabled={loading || !selectedPlatform}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Post'}
          </Button>
        </>
      ) : (
        <Typography color="text.secondary">
          Select text on the page to generate a post
        </Typography>
      )}

      <PaywallModal 
        open={showPaywall} 
        onClose={() => setShowPaywall(false)} 
      />

      <Snackbar
        open={notification.show}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, show: false })}
      >
        <Alert severity={notification.type as 'success' | 'error'}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Popup;
