import { Skeleton, SkeletonCircle, SkeletonText, Box, HStack, CardBody, Card, Grid } from '@chakra-ui/react'

export const PtoRequestSekeleton = () => {
  return (
    <>
    <Grid
      templateColumns={'3fr 3fr 1fr 3fr'}
      gap={10}
      w={'100%'}
      mb={5}
      bgColor={'gray.600'}
      px={5}
      py={2}
      borderRadius={20}
      animation="pulse 1.5s infinite" // Dodajemy animację pulsowania
      position="relative" // Dodajemy pozycję względem której animacja będzie działala
    >
      <SkeletonText noOfLines={2} height="20px" />
      <SkeletonText noOfLines={2} height="20px" />
      <SkeletonCircle size={'10'} />
      <SkeletonText noOfLines={2} height="20px" />
      
      {/* Dodajemy animację CSS */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              background-color: gray;
            }
            50% {
              background-color: lightgray;
            }
          }
        `}
      </style>
    </Grid>
    </>
  )
}
