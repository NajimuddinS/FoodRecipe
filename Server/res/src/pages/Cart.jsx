import { Box, Container, VStack, Image, Text, Button, HStack, Input, Heading, useToast } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: 'Please login first',
        status: 'warning',
        duration: 3000,
      });
      navigate('/login');
      return;
    }

    // Simulate order placement
    toast({
      title: 'Order placed successfully!',
      status: 'success',
      duration: 3000,
    });
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <Container maxW="1200px" py={8}>
        <VStack spacing={4}>
          <Heading>Your Cart is Empty</Heading>
          <Button colorScheme="red" onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="1200px" py={8}>
      <Heading mb={6}>Your Cart</Heading>
      <VStack spacing={4} align="stretch">
        {cart.map((item) => (
          <Box key={item.id} borderWidth="1px" borderRadius="lg" p={4}>
            <HStack spacing={4}>
              <Image src={item.image} alt={item.name} boxSize="100px" objectFit="cover" />
              <VStack align="start" flex={1}>
                <Text fontSize="xl" fontWeight="bold">{item.name}</Text>
                <Text>${item.price}</Text>
              </VStack>
              <HStack>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min={1}
                  max={10}
                  w="80px"
                />
                <Button colorScheme="red" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </HStack>
            </HStack>
          </Box>
        ))}
        
        <Box borderTopWidth="1px" pt={4}>
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">Total: ${getTotal().toFixed(2)}</Text>
            <Button colorScheme="green" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Cart