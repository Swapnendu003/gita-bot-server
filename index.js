const express = require ('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


const chatRoutes = require("./routes/gitaChatRoutes");


const PORT = process.env.PORT || 3000;
app.use("/chat", chatRoutes);
app.all("/", (req, res) => {
    console.log("Just got a request!");
    res.send("Yo yo");
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

