import React from 'react';
import { UserDtoRaw } from '../model/AppUser';
import { Box, HStack, Heading, Text, Tooltip, VStack } from '@chakra-ui/react';
import { BsCalendar2XFill } from 'react-icons/bs';
import { FaUmbrellaBeach } from 'react-icons/fa';

interface Props {
  user: UserDtoRaw;
}

export const HolidayStatus = ({ user }: Props) => {
  return (
    <VStack alignItems={'start'}>
<Tooltip label={`Ilość przysługujących dni urlopu, pozostało ${user.ptoDaysTotal - user.ptoDaysTaken}`}>
<HStack justifyContent={'start'}>
        <FaUmbrellaBeach size={'3rem'} color='wheat' />
        <Text fontSize={'3rem'} color={'whiteAlpha.900'}>
          {user.ptoDaysTotal}
        </Text>
      </HStack>
</Tooltip>
      <Tooltip label='Dni wykorzystane (wliczając oczekujące wnioski)'>
        <HStack>
          <BsCalendar2XFill size={'2.5rem'} color='wheat' />
          <Text fontSize={'2.5rem'} color={'whiteAlpha.800'}>
            {user.ptoDaysTaken}
          </Text>
        </HStack>
      </Tooltip>
    </VStack>
  );
};
