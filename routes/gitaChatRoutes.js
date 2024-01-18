const express = require('express');
const router = express.Router();
const chatController = require('../controllers/gitaController');

router.post('/generateResponse', async (req, res) => {
  const userInput = req.body.userInput;

  // Set headers for chunked response
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    await chatController.generateResponse(userInput, (chunk) => {
      res.write(chunk);
    });

    res.end(); // End the response stream
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
