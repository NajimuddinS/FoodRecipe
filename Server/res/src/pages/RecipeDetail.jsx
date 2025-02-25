import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Image, Text, Heading, VStack, HStack, Button, Badge, List, ListItem, useToast } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: recipe.id,
      name: recipe.name,
      price: 9.99,
      image: recipe.image
    });
    toast({
      title: 'Added to cart',
      status: 'success',
      duration: 2000,
    });
  };

  if (loading) {
    return <Box textAlign="center" py={10}>Loading...</Box>;
  }

  if (!recipe) {
    return <Box textAlign="center" py={10}>Recipe not found</Box>;
  }

  return (
    <Container maxW="1200px" py={8}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={recipe.image} alt={recipe.name} w="100%" h="400px" objectFit="cover" />
        <Box p={6}>
          <HStack justify="space-between" mb={4}>
            <Heading size="xl">{recipe.name}</Heading>
            <Badge colorScheme="green" fontSize="lg" px={3} py={1}>
              Rating: {recipe.rating}/5
            </Badge>
          </HStack>
          
          <Text fontSize="lg" color="gray.600" mb={6}>
            Cuisine: {recipe.cuisine}
          </Text>

          <VStack align="start" spacing={4}>
            <Box>
              <Heading size="md" mb={2}>Ingredients</Heading>
              <List spacing={2}>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>{ingredient}</ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={2}>Instructions</Heading>
              <List spacing={2}>
                {recipe.instructions.map((instruction, index) => (
                  <ListItem key={index}>{instruction}</ListItem>
                ))}
              </List>
            </Box>

            <Button 
              colorScheme="red" 
              size="lg" 
              onClick={handleAddToCart}
              mt={4}
            >
              Add to Cart - $9.99
            </Button>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default RecipeDetail