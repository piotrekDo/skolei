import React from 'react';
import useFindUserById from '../hooks/useFindUserById';
import useUserStore from '../service/useUserStore';
import { Box, VStack } from '@chakra-ui/react';
import { UserData } from './UserData';
import { JobStatus } from './JobStatus';
import { HolidayStatus } from './HolidayStatus';

export const UserDetails = () => {
  const { appUser } = useUserStore();
  const { data: user, error, isFetching } = useFindUserById(appUser!.userId);

  if(isFetching) return null;

  if(!user) return null;
  
  return (
    <VStack>
      <Box><UserData user={user}/></Box>
      <Box my={10}><JobStatus user={user}/></Box>
      <Box><HolidayStatus user={user}/></Box>
    </VStack>
  );
};
