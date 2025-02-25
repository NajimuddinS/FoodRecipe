import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetails } from '../api/spoonacular';
import { useRecipes } from '../context/RecipeContext';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { savedRecipes, saveRecipe, removeRecipe } = useRecipes();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const isSaved = savedRecipes.some((r) => r.id === recipe.id);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeRecipe(recipe.id);
    } else {
      saveRecipe(recipe);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
          <button
            onClick={handleSaveToggle}
            className="text-gray-600 hover:text-gray-900"
          >
            {isSaved ? (
              <BookmarkSolid className="h-6 w-6" />
            ) : (
              <BookmarkOutline className="h-6 w-6" />
            )}
          </button>
        </div>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <div
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              className="prose"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Nutrition Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-lg font-semibold">{recipe.nutrition?.calories || 'N/A'}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Protein</p>
              <p className="text-lg font-semibold">{recipe.nutrition?.protein || 'N/A'}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Carbs</p>
              <p className="text-lg font-semibold">{recipe.nutrition?.carbohydrates || 'N/A'}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Fat</p>
              <p className="text-lg font-semibold">{recipe.nutrition?.fat || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;