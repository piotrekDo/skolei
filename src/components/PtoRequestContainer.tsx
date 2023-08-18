import { PtoRaw } from '../model/Pto';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { PtoIdTime } from './PtoIdTime';
import { PtoDates } from './PtoDates';
import { PtoDecision } from './PtoDecision';
import { useState } from 'react';
import { motion } from 'framer-motion';


interface Props {
  request: PtoRaw;
}

export const PtoRequestContainer = ({ request }: Props) => {
    const [detailsVisible, setDetailsVisible] = useState(false)
    const requestResolved: boolean = !!request.decisionDateTime;
  const bgColor = !requestResolved ? 'gold' : request.wasAccepted ? 'green.300' : 'red.300';

  return (
    <Grid
    onClick={() => setDetailsVisible(!detailsVisible)}
      templateColumns={'2fr 1fr 2fr'}
      bg={'facebook.200'}
      w={'100%'}
      mb={5}
      bgColor={bgColor}
      px={5}
      py={2}
      borderRadius={20}
      _hover={{
        cursor: 'pointer',
        opacity: '0.7'
      }}
    >
      <PtoIdTime request={request} />
      <PtoDates request={request} />
      <PtoDecision request={request}/>
      {detailsVisible && <GridItem colSpan={3} w={'100%'} h={'200px'} bg={'bisque'}></GridItem >}
    </Grid>
  );
};
