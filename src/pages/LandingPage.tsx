import { HStack } from '@chakra-ui/react';
import React from 'react';
import { LoginForm } from '../components/LoginForm';

export const LandingPage = () => {
  return (
    <HStack w={'100vw'} h={'100vh'} bg={'facebook.400'}>
      <LoginForm />
    </HStack>
  );
};
