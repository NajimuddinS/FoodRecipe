import { useState } from 'react';
import { Box, Container, VStack, Heading, Text, Badge } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { user } = useAuth();
  const [orders] = useState([
    {
      id: 1,
      date: '2024-02-15',
      status: 'Delivered',
      items: [
        { name: 'Classic Margherita Pizza', quantity: 2, price: 9.99 },
        { name: 'Chicken Biryani', quantity: 1, price: 9.99 }
      ]
    },
    {
      id: 2,
      date: '2024-02-14',
      status: 'Processing',
      items: [
        { name: 'Butter Chicken', quantity: 1, price: 9.99 },
        { name: 'Garlic Naan', quantity: 2, price: 9.99 }
      ]
    }
  ]);

  if (!user) {
    return (
      <Container maxW="1200px" py={8}>
        <Heading>Please login to view your orders</Heading>
      </Container>
    );
  }

  return (
    <Container maxW="1200px" py={8}>
      <Heading mb={6}>Your Orders</Heading>
      <VStack spacing={4} align="stretch">
        {orders.map((order) => (
          <Box key={order.id} borderWidth="1px" borderRadius="lg" p={4}>
            <HStack justify="space-between" mb={4}>
              <Text fontSize="lg" fontWeight="bold">Order #{order.id}</Text>
              <Badge colorScheme={order.status === 'Delivered' ? 'green' : 'orange'}>
                {order.status}
              </Badge>
            </HStack>
            <Text color="gray.600" mb={2}>Date: {order.date}</Text>
            <VStack align="stretch">
              {order.items.map((item, index) => (
                <HStack key={index} justify="space-between">
                  <Text>{item.name} x{item.quantity}</Text>
                  <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                </HStack>
              ))}
            </VStack>
            <Box borderTopWidth="1px" mt={4} pt={2}>
              <Text fontWeight="bold" textAlign="right">
                Total: ${order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Orders