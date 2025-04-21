// src/controllers/restaurantController.js

// Placeholder for fetching all restaurants
exports.getAllRestaurants = (req, res) => {
  // Logic for getting all restaurants
  res.status(200).json({
      message: "Get all restaurants"
  });
};

// Placeholder for searching restaurants
exports.searchRestaurants = (req, res) => {
  // Logic for searching restaurants based on query params
  const searchQuery = req.query.query || '';
  res.status(200).json({
      message: `Search for restaurants with query: ${searchQuery}`
  });
};
