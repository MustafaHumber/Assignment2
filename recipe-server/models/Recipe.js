const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  ingredients: [String],
  steps: [String]
});

module.exports = mongoose.model('Recipe', recipeSchema);
