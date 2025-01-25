// popup.js

document.addEventListener('DOMContentLoaded', () => {
    // Your code for handling the popup
    console.log('Popup loaded');
});

// Health check endpoint
// Note: The 'app' object is not defined in this context, 
//       it's likely that you are using Express.js and the 'app' object should be defined elsewhere.
//       For the sake of this example, I'll assume that the 'app' object is defined and available in this scope.
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
