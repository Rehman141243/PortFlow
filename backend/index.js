const express = require('express');
require('dotenv').config();   // ✅ correct
const app = express();

require('./config/DB');

const PORT = process.env.PORT || 5000;

app.get('/Ping', (req, res) => {
  res.send('PONG');
});

app.listen(PORT, () => {
  console.log(`Server is running AT ${PORT}`);
});
