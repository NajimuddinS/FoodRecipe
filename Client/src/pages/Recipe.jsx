import { useState, useEffect } from 'react';
import { searchRecipes } from '../api/spoonacular';
import RecipeCard from '../components/RecipeCard';
import { FaSearch } from "react-icons/fa";
import Carousel from '../components/Carousel'

function Recipe() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const handleSearch = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      const newPage = reset ? 0 : page;
      const data = await searchRecipes(query, newPage * 12);
      setRecipes(reset ? data.results : [...recipes, ...data.results]);
      if (!reset) setPage(page + 1);
    } catch (err) {
      setError('Failed to search recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(true);
    }
  };



  return (
    <div>
      <Carousel/>
      <form onSubmit={handleSubmit} className="mb-8 mt-5">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes..."
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => handleSearch()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Recipe;