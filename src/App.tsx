import { Box, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import useUserStore from './service/useUserStore';
import LoginService, { checkIfTokenIsValid } from './service/LoginService';
import { ToastWithCountdown } from './components/ToastWithCountdown';
import useAppEvents from './hooks/useAppEvents';
import useErrorStore from './service/useErrorState';

export const App = () => {
  const { subscribe } = useAppEvents();
  const { appUser, login } = useUserStore();
  const { error } = useErrorStore();
  const toast = useToast();

  useEffect(() => {
    if(!error) return;
    toast({
        title: `An error ${error?.code}`,
        description: `${error?.details}`,
        status: 'error',
        duration: 9000,
        position: 'top-left',
        isClosable: true,
      })
  }, [error]);

  useEffect(() => {
    if (!appUser) return;
    if (checkIfTokenIsValid(appUser)) {
      subscribe();
    }
  }, [appUser]);

  useEffect(() => {
    const appUser = LoginService.checkAutoLogin((mils: number) => {
      toast({
        position: 'bottom',
        status: 'warning',
        duration: null,
        render: () => <ToastWithCountdown timeInSeconds={Math.min(60, mils)} />,
      });
    });
    if (appUser) {
      login(appUser);
    }
  }, []);

  return (
    <Box>
      {appUser && (
        <Box h={'50px'}>
          <Navbar />
        </Box>
      )}
      <Box bg={'facebook.500'} h='calc(100vh - 50px)'>
        <Outlet />
      </Box>
    </Box>
  );
};
