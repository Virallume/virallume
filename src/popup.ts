import { STORAGE_KEYS } from './constants';

interface GenerateResponse {
  success: boolean;
  data?: string;
  error?: string;
}

document.addEventListener('DOMContentLoaded', async () => {
  const manualInput = document.getElementById('manual-input') as HTMLTextAreaElement;
  const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
  const resultDiv = document.getElementById('result') as HTMLDivElement;
  const errorDiv = document.getElementById('error') as HTMLDivElement;
  const creditsSpan = document.getElementById('credits-left') as HTMLSpanElement;

  // Function to get selected text from active tab
  const getSelectedText = async () => {
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab?.id) {
        console.error('No active tab found');
        return;
      }

      // Inject script to get selected text
      const [{result}] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection()?.toString().trim() || ''
      });

      if (result) {
        manualInput.value = result;
        manualInput.focus();
      }
    } catch (error) {
      console.error('Error getting selected text:', error);
    }
  };

  // Try to get selected text when popup opens
  await getSelectedText();

  // Update remaining credits
  chrome.storage.local.get(STORAGE_KEYS.ANALYTICS, (data) => {
    const analytics = data[STORAGE_KEYS.ANALYTICS] || { transforms: 0 };
    const remaining = Math.max(0, 5 - analytics.transforms);
    creditsSpan.textContent = remaining.toString();
  });

  generateBtn.addEventListener('click', async () => {
    const text = manualInput.value.trim();
    if (!text) {
      showError('Please enter or select text to generate a post.');
      return;
    }

    try {
      generateBtn.disabled = true;
      resultDiv.style.display = 'none';
      errorDiv.style.display = 'none';

      const response = await chrome.runtime.sendMessage({
        type: 'TRANSFORM_TEXT',
        text: text
      }) as GenerateResponse;

      if (response.success && response.data) {
        showResult(response.data);
        // Update credits display
        chrome.storage.local.get(STORAGE_KEYS.ANALYTICS, (data) => {
          const analytics = data[STORAGE_KEYS.ANALYTICS] || { transforms: 0 };
          const remaining = Math.max(0, 5 - analytics.transforms);
          creditsSpan.textContent = remaining.toString();
        });
      } else {
        showError(response.error || 'Failed to generate post');
      }
    } catch (error) {
      showError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      generateBtn.disabled = false;
    }
  });

  function showResult(text: string) {
    resultDiv.textContent = text;
    resultDiv.style.display = 'block';
    errorDiv.style.display = 'none';
  }

  function showError(message: string) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    resultDiv.style.display = 'none';
  }
});
