const express = require('express');
const router = express.Router();
const chatController = require('../controllers/gitaController');

router.post('/generateResponse', async (req, res) => {
  const userInput = req.body.userInput;

  // Set headers for chunked response
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const responseText = await chatController.generateResponse(userInput);

    // Split the response into chunks
    const chunkSize = 1024; // Adjust the chunk size as needed
    const responseChunks = responseText.match(new RegExp(`.{1,${chunkSize}}`, 'g'));

    // Stream chunks with a delay
    async function streamChunks() {
      for (const chunk of responseChunks) {
        res.write(chunk);
        await new Promise(resolve => setTimeout(resolve, 200)); // Adjust delay as needed
      }
      res.end(); // End the response stream after all chunks are sent
    }

    streamChunks();
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
