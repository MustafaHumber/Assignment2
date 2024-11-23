import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

function App() {
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from the server
  useEffect(() => {
    fetch('http://localhost:8001/recipe')
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error('Error fetching recipes:', err));
  }, []);

  // Add new recipe to the list
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <div>
      <h1>Recipe App</h1>
      <RecipeForm onAddRecipe={addRecipe} />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
