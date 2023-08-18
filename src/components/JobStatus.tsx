import { Box, Grid, GridItem, HStack, SimpleGrid, Text, Tooltip, VStack } from '@chakra-ui/react';
import { UserDtoRaw } from '../model/AppUser';
import { MdWork } from 'react-icons/md';
import { TbCalendarCheck, TbCalendarOff } from 'react-icons/tb';

export interface Props {
  user: UserDtoRaw;
}

export const JobStatus = ({ user }: Props) => {
  const hireDate = new Date(user.jobStart);
  const hireExp = user.jobEnd && new Date(user.jobEnd);

  return (
    <Grid templateColumns='3fr 3fr 3fr' gap={3} w={'100%'} p={2} color={'whiteAlpha.900'}>
      <Tooltip label='Stanowisko'>
        <GridItem>
          <HStack>
            <MdWork size={'2rem'} color='wheat' />
            <Text>{user.position}</Text>
          </HStack>
        </GridItem>
      </Tooltip>
      <Tooltip label='Data rozpoczęcia pracy'>
        <HStack>
          <TbCalendarCheck color='wheat' size={'2rem'} /> <Text>{user.jobStart}</Text>
        </HStack>
      </Tooltip>
      <Tooltip label='Data zakończenia umowy'>
        <HStack>
          {' '}
          <TbCalendarOff color='wheat' size={'2rem'} /> <Text>{user.jobEnd || 'czas nieokreślony'}</Text>
        </HStack>
      </Tooltip>
    </Grid>
  );
};
