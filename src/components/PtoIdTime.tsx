import { PtoRaw } from '../model/Pto';
import { Box, HStack, Tooltip, VStack } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';
import { BsFileEarmarkTextFill } from 'react-icons/bs';

interface Props {
  request: PtoRaw;
}

export const PtoIdTime = ({ request }: Props) => {
  const dateTimeFormatter = new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
  });
  const requestTime = new Date(request.requestDateTime);
  const requestFormattedDate = dateTimeFormatter.format(requestTime);
  return (
    <VStack>
      <Tooltip label='Numer wniosku'>
        <HStack>
          <FaHashtag />
          <Box>{request.id}</Box>
        </HStack>
      </Tooltip>
      <Tooltip label='Data wniosku'>
        <HStack>
            <BsFileEarmarkTextFill />
        <Box>{requestFormattedDate}</Box>
        </HStack>
      </Tooltip>
    </VStack>
  );
};
