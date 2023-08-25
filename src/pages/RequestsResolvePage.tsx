import useUserStore from '../service/useUserStore';
import useRequestsToAccept from '../hooks/useRequestsToAccept';
import { Heading, VStack } from '@chakra-ui/react';
import { PtoRequestToAccept } from '../components/PtoRequestToAccept';
import { PtoRequestSekeleton } from '../components/PtoRequestSekeleton';

export const RequestsResolvePage = () => {
  const { appUser } = useUserStore();
  const { data, error, isFetching } = useRequestsToAccept(appUser!.userId);

  console.log(data);
  return (
    <VStack w={'100%'}>
      {isFetching && (
        <>
          <PtoRequestSekeleton />
          <PtoRequestSekeleton />
          <PtoRequestSekeleton />
        </>
      )}
      {!data ||
        (!isFetching && data.length === 0 && (
          <Heading mt={20} color={'whiteAlpha.800'}>
            Brak wniosków do rozpatrzenia
          </Heading>
        ))}
      {!isFetching && data && data.length > 0 && data.map(request => <PtoRequestToAccept key={request.id} request={request} />)}
    </VStack>
  );
};
