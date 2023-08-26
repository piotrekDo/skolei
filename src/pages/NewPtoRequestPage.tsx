import { Box, HStack, Stack } from '@chakra-ui/react';
import { PtoRequestForm } from '../components/PtoRequestForm';
import { UserDetails } from '../components/UserDetails';
import { useState } from 'react';

export const NewPtoRequestPage = () => {
  const [isUserDataFetching, setIsUserDataFetching] = useState(true);
  return (
    <HStack p={10}>
      <Box w={'40%'}>
        <UserDetails setIsUserDataFetching={setIsUserDataFetching}/>
      </Box>
      <Stack w={'60%'} justifyContent={'center'} alignItems={'center'}>
        <PtoRequestForm isUserDataFetching={isUserDataFetching} />
      </Stack>
    </HStack>
  );
};
