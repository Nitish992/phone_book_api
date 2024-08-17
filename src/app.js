const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { PORT } = require('./config');

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
