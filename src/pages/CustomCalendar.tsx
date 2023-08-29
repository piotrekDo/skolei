import { Box, Grid, HStack, VStack } from '@chakra-ui/react';
import React from 'react';

export const CustomCalendar = () => {
  const currentDate = new Date(2023, 7, 29);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const days = currentDate.getDate();
  console.log(monthName, days);
  console.log(currentDate.getDay())

  return (
    <HStack justifyContent={'start'} alignItems={'start'} w={'100%'}>
      <VStack>
        <Box> </Box>
        <Box>Lorem, ipsum.</Box>
        <Box>Lorem, ipsum.</Box>
        <Box>Lorem, ipsum.</Box>
        <Box>Lorem, ipsum.</Box>
        <Box>Lorem, ipsum.</Box>
        <Box>Lorem, ipsum dolor.</Box>
      </VStack>
      <Grid templateColumns={`repeat(${days}, 1fr)`} w={'100%'}>
        {[...Array(days)].map((x, i) => (
          <Box key={i} w={'100%'} h={'100%'} textAlign={'center'}>
            {i + 1}
          </Box>
        ))}
      </Grid>
    </HStack>

  );
};
