/// <reference types="chrome"/>

import CryptoJS from 'crypto-js';
import { DEFAULT_PREFERENCES } from './constants';
import { transformText, getTrends } from './services/api';

// Initialize extension when installed or updated
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    // Initialize preferences and analytics
    chrome.storage.local.set({ 
      preferences: DEFAULT_PREFERENCES,
      analytics: {
        transforms: 0,
        trendsChecks: 0
      }
    });
  }
});

// Listen for messages from popup and content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'TRANSFORM_TEXT':
      handleTextTransformation(request.text, request.preferences || DEFAULT_PREFERENCES)
        .then(sendResponse);
      return true; // Keep message channel open for async response
      
    case 'GET_TRENDS':
      handleGetTrends()
        .then(sendResponse);
      return true; // Keep message channel open for async response

    case 'TRACK_EVENT':
      trackAnalytics(request.event, request.data);
      sendResponse({ success: true });
      break;
  }
  return true;
});

async function handleTextTransformation(text: string, preferences: any) {
  try {
    // Check remaining credits
    const { analytics = { transforms: 0 } } = await chrome.storage.local.get('analytics');
    if (analytics.transforms >= 5) {
      return {
        success: false,
        error: 'You have reached your free generation limit. Please try again later.'
      };
    }

    const result = await transformText(text, preferences);
    
    if (!result.success) {
      throw new Error(result.error);
    }

    // Update analytics
    await chrome.storage.local.set({
      analytics: {
        ...analytics,
        transforms: analytics.transforms + 1
      }
    });
    
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Text transformation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to transform text'
    };
  }
}

async function handleGetTrends() {
  try {
    const result = await getTrends();
    
    if (!result.success) {
      throw new Error(result.error);
    }

    // Update analytics
    const { analytics = { trendsChecks: 0 } } = await chrome.storage.local.get('analytics');
    await chrome.storage.local.set({
      analytics: {
        ...analytics,
        trendsChecks: analytics.trendsChecks + 1
      }
    });
    
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error('Get trends error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get trends'
    };
  }
}

function trackAnalytics(event: string, data: any) {
  const analyticsEvent = {
    event,
    timestamp: Date.now(),
    data
  };

  chrome.storage.local.get(['analytics'], (result) => {
    const analytics = result.analytics || [];
    analytics.push(analyticsEvent);
    chrome.storage.local.set({ analytics });
  });
}
