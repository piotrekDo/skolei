import React, { useRef, useState } from 'react';
import { PtoRaw, PtoResolve } from '../model/Pto';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Button, HStack, VStack, Box, RadioGroup, Stack, Radio, Text, Input } from '@chakra-ui/react';
import useResolveRequest from '../hooks/useResolveRequest';

interface Props {
  request: PtoRaw;
  hideFn: () => void;
}

export const RequestResolveForm = ({ request, hideFn }: Props) => {
  const { submit, isSubmitting } = useResolveRequest();
  const declineReasonRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<'' | 'accept' | 'decline'>('');

  const handleSubmit = () => {
    const requestResolve: PtoResolve = {
      ptoRequestId: request.id,
      isAccepted: selectedOption === 'accept',
      declineReason: selectedOption === 'decline' && declineReasonRef ? declineReasonRef.current?.value : '',
    };

    submit(requestResolve);
  };

  return (
    <VStack mt={10} w={'100%'} h={'100%'} position={'relative'}>
      <HStack>
        <HStack
          onClick={() => setSelectedOption('accept')}
          bg={selectedOption === 'accept' ? 'green.200' : ''}
          cursor={'pointer'}
          borderRadius={'20px'}
          mx={1}
          padding={2}
          w={'150px'}
          justifyContent='center'
        >
          <FaCheckCircle /> <Text>Zaakceptuj</Text>
        </HStack>
        <HStack
          onClick={() => setSelectedOption('decline')}
          bg={selectedOption === 'decline' ? 'red.200' : ''}
          cursor={'pointer'}
          borderRadius={'20px'}
          mx={1}
          padding={2}
          minW={'150px'}
          justifyContent='center'
        >
          <FaTimesCircle /> <Text>Odrzuć</Text>
        </HStack>
      </HStack>
      <Input
        ref={declineReasonRef}
        visibility={selectedOption === 'decline' ? 'visible' : 'hidden'}
        _placeholder={{ textAlign: 'center' }}
        placeholder='Opcjonalnie powód'
        w={'60%'}
      />
      <Button isDisabled={selectedOption === ''} w={'60%'} onClick={handleSubmit}>
        Wyślij
      </Button>
      <Button
        position={'absolute'}
        bottom={'40px'}
        right={'0px'}
        w={'60px'}
        h={'60px'}
        borderRadius={'50%'}
        onClick={() => hideFn()}
      >
        Zwiń
      </Button>
    </VStack>
  );
};
