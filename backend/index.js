const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientRoutes = require('./clients');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/clients', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});