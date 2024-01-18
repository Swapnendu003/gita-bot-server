const express = require('express');
const app = express();
const cors = require('cors');
const chatRoutes = require('./routes/gitaChatRoutes');

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.use('/chat', chatRoutes);

app.all('/', (req, res) => {
  console.log('Just got a request!');
  res.send('Yo yo');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
