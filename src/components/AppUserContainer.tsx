import React from 'react';
import { UserDtoRaw } from '../model/AppUser';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { UserData } from './UserData';
import { JobStatus } from './JobStatus';
import { RolesStatus } from './RolesStatus';
import { HolidayStatus } from './HolidayStatus';

interface Props {
  user: UserDtoRaw;
}

export const AppUserContainer = ({ user }: Props) => {
  return (
    <HStack bg={'facebook.600'} w={'100%'} justify={'space-between'} align={'start'} borderRadius={20} py={3} px={5}>
      <VStack justify={'start'} align={'start'} w={'60%'}>
        <HStack w={'100%'}>
          <UserData user={user} />
        </HStack>
        <HStack w={'100%'} mt={10}>
          <JobStatus user={user} />
        </HStack>
        <HStack w={'50%'}>
          <RolesStatus user={user} />
        </HStack>
      </VStack>
      <Box w={'30%'}>
        <HolidayStatus user={user} />
      </Box>
    </HStack>
  );
};
