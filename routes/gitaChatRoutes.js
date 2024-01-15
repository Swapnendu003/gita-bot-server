// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/gitaController");

router.post("/generateResponse", async (req, res) => {
  const userInput = req.body.userInput;

  try {
    const response = await chatController.generateResponse(userInput);
    res.json({ success: true, response });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
