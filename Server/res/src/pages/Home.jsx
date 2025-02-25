import { useState, useEffect } from 'react';
import { Box, Grid, Image, Text, Container, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getRecipes } from '../services/api';
import SearchBar from '../components/SearchBar';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Box textAlign="center" py={10}>Loading...</Box>;
  }

  return (
    <Container maxW="1200px" py={8}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <Heading mb={6}>Popular Recipes</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {filteredRecipes.map((recipe) => (
          <Box 
            key={recipe.id} 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            _hover={{ transform: 'scale(1.02)', transition: 'all 0.2s' }}
          >
            <Image 
              src={recipe.image} 
              alt={recipe.name} 
              h="200px" 
              w="100%" 
              objectFit="cover" 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              cursor="pointer"
            />
            <Box p={4}>
              <Heading size="md" mb={2}>{recipe.name}</Heading>
              <Text color="gray.600">Cuisine: {recipe.cuisine}</Text>
              <Text color="gray.600" mb={4}>Rating: {recipe.rating}/5</Text>
              <Button 
                colorScheme="red" 
                size="sm" 
                onClick={() => addToCart({
                  id: recipe.id,
                  name: recipe.name,
                  price: 9.99,
                  image: recipe.image
                })}
              >
                Add to Cart 
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default Home