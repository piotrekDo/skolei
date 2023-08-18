import { Box, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import useUserStore from './service/useUserStore';
import LoginService, { checkIfTokenIsValid } from './service/LoginService';
import { ToastWithCountdown } from './components/ToastWithCountdown';
import useAppEvents from './hooks/useAppEvents';
import useErrorStore from './service/useErrorState';
import APIclient from './service/APIclient';

export const App = () => {
  const { subscribe } = useAppEvents();
  const { appUser, login } = useUserStore();
  const { error } = useErrorStore();
  const toast = useToast();

  APIclient.interceptors.request.use(
    (config) => {
      if (appUser?.jwtToken) {
        config.headers['Authorization'] = `Bearer ${appUser?.jwtToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

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

  useEffect(() => {
    if (!appUser) return;
    if (checkIfTokenIsValid(appUser)) {
      subscribe();
    }
  }, [appUser]);

  useEffect(() => {
    if(!error) return;

    toast({
        title: `An error ${error?.code}`,
        description: `${error.details}`,
        status: 'error',
        duration: 9000,
        position: 'top-left',
        isClosable: true,
      })
  }, [error]);

  return (
    <Box>
      {appUser && (
        <Box h={'50px'}>
          <Navbar />
        </Box>
      )}
      <Box bg={'facebook.500'} minH='calc(100vh - 50px)' p={5}>
        <Outlet />
      </Box>
    </Box>
  );
};
