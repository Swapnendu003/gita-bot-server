const express = require('express');
const router = express.Router();
const chatController = require('../controllers/gitaController');

router.post('/generateResponse', async (req, res) => {
  const userInput = req.body.userInput;

  // Set headers for chunked response
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    // Call the generateResponse method from the controller and await the response
    const responseText = await chatController.generateResponse(userInput);

    // Split the response into chunks
    const chunkSize = 1024; // Adjust the chunk size if necessary
    const responseChunks = responseText.match(new RegExp(`.{1,${chunkSize}}`, 'g'));

    // Stream chunks with a delay
    async function streamChunks() {
      for (const chunk of responseChunks) {
        res.write(chunk); // Write each chunk
        await new Promise(resolve => setTimeout(resolve, 200)); // Delay each chunk to simulate streaming
      }
      res.end(); // End the response after all chunks are sent
    }

    // Stream the chunks to the client
    streamChunks();
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
