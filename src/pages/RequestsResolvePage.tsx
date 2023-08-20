import React from 'react';
import useUserStore from '../service/useUserStore';
import useRequestsToAccept from '../hooks/useRequestsToAccept';
import { VStack } from '@chakra-ui/react';
import { PtoRequestContainer } from '../components/PtoRequestContainer';
import { PtoRequestToAccept } from '../components/PtoRequestToAccept';

export const RequestsResolvePage = () => {
  const { appUser } = useUserStore();
  const { data, error, isFetching } = useRequestsToAccept(appUser!.userId);
  
  console.log(data)
    return (
        <VStack w={'100%'}> 
            {data && data.length > 0 && data.map(request => (
                <PtoRequestToAccept key={request.id} request={request}/>
            ))}
        </VStack>
    );
};
