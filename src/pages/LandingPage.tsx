import { HStack } from '@chakra-ui/react';
import React from 'react';
import { LoginForm } from '../components/LoginForm';

export const LandingPage = () => {
  return (
    <HStack h={'100%'}>
      <LoginForm />
    </HStack>
  );
};
