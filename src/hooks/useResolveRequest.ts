import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PtoRaw, PtoResolve } from '../model/Pto';
import PtoService from '../service/PtoService';
import { useState } from 'react';
import useErrorStore from '../service/useErrorState';
import { useToast } from '@chakra-ui/react';

const useResolveRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setError = useErrorStore(s => s.setError);
  const queryClient = useQueryClient();
  const toast = useToast();

  const submit = (resolve: PtoResolve) => {
    setError(undefined);
    setIsSubmitting(true);
    PtoService.resolvePtoRequest(resolve)
      .then(res => {
        queryClient.invalidateQueries(['requestsToAccept']);
        toast({
          title: `Wniosek ${res.applierFirstName} ${res.applierLastName} został ${
            res.wasAccepted ? 'zaakceptowany' : 'odrzucony'
          }`,
          status: 'success',
          position: 'top',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(err => {
        setError(err.response.data);
        console.log(err.response.data);
      })
      .finally(() => setIsSubmitting(false));
  };

  return { submit, isSubmitting };
};

export default useResolveRequest;
