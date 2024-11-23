import React, { useState } from 'react';

const RecipeForm = ({ onAddRecipe }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: '',
    ingredients: '',
    steps: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((item) => item.trim()),
      steps: formData.steps.split('.').map((step) => step.trim()),
    };

    // Send the new recipe to the server
    fetch('http://localhost:8001/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddRecipe(data);
        setFormData({
          name: '',
          description: '',
          difficulty: '',
          ingredients: '',
          steps: '',
        });
      })
      .catch((err) => console.error('Error adding recipe:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Recipe Name" value={formData.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="difficulty" placeholder="Difficulty" value={formData.difficulty} onChange={handleChange} required />
      <textarea name="ingredients" placeholder="Ingredients (comma-separated)" value={formData.ingredients} onChange={handleChange} required />
      <textarea name="steps" placeholder="Steps (period-separated)" value={formData.steps} onChange={handleChange} required />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
