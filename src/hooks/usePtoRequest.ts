import { useState } from 'react';
import useUserStore from '../service/useUserStore';
import useErrorStore from '../service/useErrorState';
import { PtoRaw, PtoRequest } from '../model/Pto';
import { FieldValues } from 'react-hook-form';
import APIclient from '../service/APIclient';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { UserDtoRaw } from '../model/AppUser';

const usePtoRequest = () => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setError = useErrorStore(s => s.setError);
  const { appUser } = useUserStore();
  const queryClient = useQueryClient();


  const submit = (dataFields: FieldValues, reset: any) => {
    setError(undefined);
    setIsSubmitting(true);
    const ptoReq: PtoRequest = {
      ptoStart: dataFields.ptoStart,
      ptoEnd: dataFields.ptoEnd,
      applierId: appUser!.userId,
      acceptorId: dataFields.acceptorId,
      durationInDays: dataFields.daysTotal,
    };
    console.log(ptoReq);
    APIclient.post<PtoRaw>('/pto/request-new', ptoReq)
      .then(res => {
        toast({
          title: 'Wniosek wysłany',
          description: `Twój urlop między ${res.data.ptoStart} a ${res.data.ptoEnd} został przekazany do potwierdzenia.`,
          status: 'success',
          position: 'top',
          duration: 9000,
          isClosable: true,
        });
        reset();
       const currentUserData: UserDtoRaw | undefined = queryClient.getQueryData(['user', appUser?.userId]);
       if(currentUserData) {
          currentUserData.ptoDaysTaken += ptoReq.durationInDays;
          queryClient.invalidateQueries(['user'])
       }

      })
      .catch(err => {
        setError(err.response.data);
        console.log(err.response.data);
      })
      .finally(() => setIsSubmitting(false));
  };

  return { submit, isSubmitting };
};

export default usePtoRequest;
