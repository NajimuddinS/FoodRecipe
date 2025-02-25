import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

function RecipeCard({ recipe }) {
  const { savedRecipes, saveRecipe, removeRecipe } = useRecipes();
  const isSaved = savedRecipes.some((r) => r.id === recipe.id);

  const handleSaveToggle = (e) => {
    e.preventDefault();
    if (isSaved) {
      removeRecipe(recipe.id);
    } else {
      saveRecipe(recipe);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/recipe/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {recipe.title}
            </h3>
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
          <p className="text-sm text-gray-600">
            Ready in {recipe.readyInMinutes} minutes
          </p>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;