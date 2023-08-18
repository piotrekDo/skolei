import { Box, HStack, Stack } from '@chakra-ui/react';
import { PtoRequestForm } from '../components/PtoRequestForm';
import { UserDetails } from '../components/UserDetails';

export const NewPtoRequestPage = () => {
  return (
    <HStack p={10}>
      <Box w={'40%'}><UserDetails /></Box>
      <Stack w={'60%'} justifyContent={'center'} alignItems={'center'}><PtoRequestForm /></Stack>
    </HStack>
  );
};
