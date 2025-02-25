import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Recipe from './pages/Recipe';
import RecipeDetails from './pages/RecipeDetails';
import SavedRecipes from './pages/SavedRecipes';
import Form from './components/Form'
import { RecipeProvider } from './context/RecipeContext';
import './index.css'

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Recipe />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/saved-recipes" element={<SavedRecipes />} />
              <Route path="/login" element={<Form />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;