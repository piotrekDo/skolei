import { PtoRaw } from '../model/Pto';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { PtoIdTime } from './PtoIdTime';
import { PtoDates } from './PtoDates';
import { PtoDecision } from './PtoDecision';
import { useState } from 'react';
import { PtoRequester } from './PtoRequester';
import { RequestResolveForm } from './RequestResolveForm';
import HolidayService from '../service/HolidayService';

interface Props {
  request: PtoRaw;
}

export const PtoRequestToAccept = ({ request }: Props) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  console.log(request);
  return (
    <Grid
      onClick={() => {
        if (!detailsVisible) setDetailsVisible(true);
      }}
      templateColumns={'2fr 1fr 2fr'}
      bg={'facebook.200'}
      w={'100%'}
      mb={5}
      bgColor={'yellowgreen'}
      px={5}
      py={2}
      borderRadius={20}
      _hover={
        (!detailsVisible && {
          cursor: 'pointer',
          opacity: '0.7',
        }) ||
        {}
      }
    >
      <PtoIdTime request={request} />
      <PtoDates request={request} />
      <PtoRequester request={request} />
      {detailsVisible && (
        <GridItem colSpan={3} w={'100%'} minH={'200px'}>
          <Box mt={10}>
          <Text textAlign={'center'}>{`Przesłany wniosek powinien zawierać ${HolidayService.calculateBusinessDays(new Date(request.ptoStart), new Date(request.ptoEnd))} dni jako deklarowanych dni roboczych.`}</Text>
          </Box>
          <RequestResolveForm request={request} hideFn={() => setDetailsVisible(false)} />
        </GridItem>
      )}
    </Grid>
  );
};
