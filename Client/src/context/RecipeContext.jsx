import { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const saveRecipe = (recipe) => {
    setSavedRecipes((prev) => {
      if (prev.some((r) => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  };

  const removeRecipe = (recipeId) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  const reorderRecipes = (startIndex, endIndex) => {
    setSavedRecipes((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return (
    <RecipeContext.Provider value={{ savedRecipes, saveRecipe, removeRecipe, reorderRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipeContext);
}