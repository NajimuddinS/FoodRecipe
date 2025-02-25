import { Box, Flex, Button, Heading, HStack } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <>
      <Box 
        bg="red.500" 
        px={4} 
        py={3} 
        position="fixed" 
        top="0" 
        left="0" 
        width="100%" 
        zIndex="1000"
        boxShadow="md"
      >
        <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
          <Link to="/">
            <Heading size="lg" color="white">Recipe App</Heading>
          </Link>
          <HStack spacing={4}>
            <Link to="/cart">
              <Button colorScheme="white" variant="outline">
                Cart ({cart.length})
              </Button>
            </Link>
            {user ? (
              <>
                {/* <Link to="/orders">
                  <Button colorScheme="white" variant="outline">Orders</Button>
                </Link> */}
                <Button onClick={logout} colorScheme="white" variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button colorScheme="white" variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button colorScheme="white" variant="outline">Sign Up</Button>
                </Link>
              </>
            )}
          </HStack>
        </Flex>
      </Box>

      {/* Add margin-top to avoid content being hidden */}
      <Box mt="60px"></Box>
    </>
  );
};

export default Navbar;
