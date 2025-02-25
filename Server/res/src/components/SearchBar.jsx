import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ value, onChange }) => {
  return (
    <InputGroup maxW="600px" mx="auto" mb={8}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        placeholder="Search recipes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="white"
        size="lg"
      />
    </InputGroup>
  );
};

export default SearchBar;