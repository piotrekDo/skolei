import React, { useEffect } from 'react';
import useFindUserById from '../hooks/useFindUserById';
import useUserStore from '../service/useUserStore';
import { Box, Spinner, VStack } from '@chakra-ui/react';
import { UserData } from './UserData';
import { JobStatus } from './JobStatus';
import { HolidayStatus } from './HolidayStatus';

interface Props {
  setIsUserDataFetching: (val: boolean) => void;
}

export const UserDetails = ({setIsUserDataFetching}: Props) => {
  const { appUser } = useUserStore();
  const { data: user, error, isFetching } = useFindUserById(appUser!.userId);

  useEffect(() => {
    setIsUserDataFetching(isFetching);
  }, [isFetching]);

  if (!user) return null;

  return (
    <VStack>
      {isFetching && (
       <Spinner size={'xl'} color='wheat'/>
      )}
      {!isFetching && (
        <>
          <Box>
            <UserData user={user} />
          </Box>
          <Box my={10}>
            <JobStatus user={user} />
          </Box>
          <Box>
            <HolidayStatus user={user} />
          </Box>
        </>
      )}
    </VStack>
  );
};
