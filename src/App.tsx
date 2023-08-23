import { Box, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import useUserStore from './service/useUserStore';
import LoginService, { checkIfTokenIsValid } from './service/LoginService';
import { ToastWithCountdown } from './components/ToastWithCountdown';
import useAppEvents from './hooks/useAppEvents';
import useErrorStore from './service/useErrorState';
import APIclient from './service/APIclient';
import { BASE_URL } from './config';

export const App = () => {
  const [userEmail, setUserEmail] = useState('');
  const { subscribe, unsubscribe } = useAppEvents();
  const { appUser, login } = useUserStore();
  const { error } = useErrorStore();
  const toast = useToast();
  const appUserRef = useRef(appUser);

  APIclient.interceptors.request.use(
    config => {
      if (appUserRef.current && appUserRef.current.jwtToken) {
        config.headers['Authorization'] = `Bearer ${appUserRef.current?.jwtToken}`;
      }
      return config;
    },
    error => {
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
      appUserRef.current = appUser;
      login(appUser);
    }
  }, []);

  useEffect(() => {
    if (!appUser) {
      unsubscribe();
      if(userEmail === '') return;
      const data = new FormData();
      data.append('userEmail', userEmail);
      navigator.sendBeacon(`${BASE_URL}/sse/unsubscribe`, data);
      setUserEmail('');
      return;
    }
    if (checkIfTokenIsValid(appUser)) {
      appUserRef.current = appUser;
      setUserEmail(appUser.userEmail);
      subscribe();
    }
  }, [appUser]);

  useEffect(() => {
    if (!error) return;

    toast({
      title: `An error ${error?.code}`,
      description: `${error.details}`,
      status: 'error',
      duration: 9000,
      position: 'top-left',
      isClosable: true,
    });
  }, [error]);

  return (
    <Box>
      {appUser && (
        <Box h={'50px'}>
          <Navbar />
        </Box>
      )}
      <Box bg={'facebook.500'} minH={appUser ? 'calc(100vh - 50px)' : '100vh'} p={5}>
        <Outlet />
      </Box>
    </Box>
  );
};
