import React from 'react'
import { PtoRaw } from '../model/Pto'
import { HStack, VStack, Text } from '@chakra-ui/react'

interface Props {
    request : PtoRaw
}

export const PtoRequester = ({request}: Props) => {
  return (
   <VStack>
    <HStack><Text>{request.applierFirstName}</Text> <Text>{request.applierLastName}</Text></HStack>
    <Text>{request.applierEmail}</Text>
   </VStack>
  )
}
