import { Box, Grid, GridItem, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { UserDtoRaw } from '../model/AppUser';

interface Prosps {
  user: UserDtoRaw;
}

export const RolesStatus = ({ user }: Prosps) => {
    const isAdmin = user.roles.indexOf('ADMIN') > -1;
    const isMod = user.roles.indexOf('MODERATOR') > -1;
  return (
    <Grid templateColumns='1fr 4fr 4fr' gap={3} w={'100%'} p={2} color={'whiteAlpha.900'}>
        {isAdmin && <GridItem color={'gold'}>ADMINISTRATOR</GridItem>}
        {isMod && <GridItem color={'yellow.200'}>MODERATOR</GridItem>}
        <GridItem color={'blue.100'}>USER</GridItem>
    </Grid>
  );
};
