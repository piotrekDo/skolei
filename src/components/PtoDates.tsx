import React from 'react';
import { PtoRaw } from '../model/Pto';
import { Box, HStack, Tooltip, VStack } from '@chakra-ui/react';
import { FaCalendarAlt, FaCalendarTimes } from 'react-icons/fa';

interface Props {
  request: PtoRaw;
}

export const PtoDates = ({ request }: Props) => {
  const dateFormatter = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

  const ptoStartDate = new Date(request.ptoStart);
  const ptoStartFormattedDate = dateFormatter.format(ptoStartDate);

  const ptoEndDate = new Date(request.ptoEnd);
  const ptoEndFormattedDate = dateFormatter.format(ptoEndDate);
  return (
    <VStack>
      <Tooltip label='Data rozpoczęcia urlopu'><HStack><FaCalendarAlt /><Box>{ptoStartFormattedDate}</Box></HStack></Tooltip>
      <Tooltip label='Data zakończenia urlopu'><HStack><FaCalendarTimes /> <Box>{ptoEndFormattedDate}</Box></HStack></Tooltip>
    </VStack>
  );
};
