const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const restaurantRoutes = require('./routes/restaurantRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant Finder API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
