// Debug alert to confirm content script is loaded
alert('ViralLume content script loaded');

// Store selected text
let lastSelectedText = '';

// Update selected text when selection changes
document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  if (selection) {
    lastSelectedText = selection.toString().trim();
    console.log('Text selected:', lastSelectedText);
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request);
  
  if (request.type === 'GET_SELECTED_TEXT') {
    const selectedText = window.getSelection()?.toString().trim() || lastSelectedText;
    console.log('Sending selected text:', selectedText);
    
    // Send response immediately
    sendResponse({
      success: true,
      text: selectedText
    });
  }
  // Return true to indicate we will send a response asynchronously
  return true;
});
