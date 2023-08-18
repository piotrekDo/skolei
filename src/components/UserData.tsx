import React from 'react';
import { UserDtoRaw } from '../model/AppUser';
import { Box, Grid, GridItem, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { BsPersonCircle } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';

interface Props {
  user: UserDtoRaw;
}

export const UserData = ({ user }: Props) => {
  return (
    <Grid templateColumns='1fr 4fr 4fr' gap={3} w={'100%'} p={2} color={'whiteAlpha.900'}>
      <GridItem>
        <Box w={'100%'}>ID: {user.id}</Box>
      </GridItem>
      <GridItem>
        <HStack w={'fit-content'}>
          <BsPersonCircle size={'3rem'} color='wheat'/>
          <VStack w={'100%'}>
            <Text>{user.firstName}</Text>
            <Text>{user.lastName}</Text>
          </VStack>
        </HStack>
      </GridItem>
      <GridItem>
        <VStack justifyContent={'center'} alignItems={'center'} w={'100%'}>
          <HStack><GrMail color='wheat' size={'2rem'}/> <Text>{user.userEmail}</Text></HStack>
          <Text textAlign={'center'} borderRadius={20} w={'100%'} bg={user.accountEnabled ? 'green.500' : 'red.600'}>
            {user.accountEnabled ? 'Enabled' : 'Disabled'}
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
};
