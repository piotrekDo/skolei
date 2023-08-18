import { PtoRaw } from '../model/Pto';
import { Box, HStack, Tooltip, VStack } from '@chakra-ui/react';
import { BiTimer, BiCheckCircle, BiXCircle } from 'react-icons/bi';

interface Props {
  request: PtoRaw;
}

export const PtoDecision = ({ request }: Props) => {
  const dateTimeFormatter = new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
  });
  const ptoDecisionTime = (request.decisionDateTime && new Date(request.decisionDateTime)) || undefined;
  const ptoDecisionTimeFormatted =
    (ptoDecisionTime && dateTimeFormatter.format(ptoDecisionTime)) || 'Czeka na akceptację';
  const requestResolved: boolean = !!request.decisionDateTime;

  return (
    <HStack>
      {!requestResolved && <BiTimer size={'3rem'} />}
      {request.wasAccepted && <BiCheckCircle size={'3rem'} />}
      {requestResolved && !request.wasAccepted && <BiXCircle size={'3rem'} />}
      <Tooltip label={requestResolved && !request.wasAccepted && `Powód odmowy: ${request.declineReason}`}>
        <VStack alignItems={'start'} ml={3}>
          <Box>
            Status: {!requestResolved ? 'Czeka na akceptację' : request.wasAccepted ? 'Zaakceptowany' : 'Odrzucony'}
          </Box>
          <Box>Data decyzji: {ptoDecisionTimeFormatted}</Box>
        </VStack>
      </Tooltip>
    </HStack>
  );
};
