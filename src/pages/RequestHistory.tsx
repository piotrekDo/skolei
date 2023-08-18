import React from 'react';
import useAllPtoRequests from '../hooks/useAllPtoRequests';
import useUserStore from '../service/useUserStore';
import { Box, Button, Stack, VStack } from '@chakra-ui/react';
import { PtoRaw } from '../model/Pto';
import { PtoRequestContainer } from '../components/PtoRequestContainer';

export const RequestHistory = () => {
  const { appUser } = useUserStore();
  const { data, error, isLoading, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useAllPtoRequests(
    appUser!.userId
  );

  const totalRequests = data?.pages[data.pages.length - 1].totalElements;
  const requests: PtoRaw[] = [];
  data?.pages.map(page => page.content).forEach(content => content.forEach(request => requests.push(request)));

  console.log(data);
  return (
    <VStack w={'100%'}>
      <Box w={'100%'}>
        {requests.map(request => (
          <PtoRequestContainer key={request.id} request={request} />
        ))}
      </Box>
      <Stack w={'70%'}>
        <Button
          isDisabled={isFetchingNextPage || !hasNextPage}
          isLoading={isFetchingNextPage}
          w={'100%'}
          colorScheme='teal'
          onClick={() => fetchNextPage()}
        >
          {hasNextPage ? 'Pobierz więcej' : 'To już wszystkie Twoje wnioski'}
        </Button>
      </Stack>
    </VStack>
  );
};
