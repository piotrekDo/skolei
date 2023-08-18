import React, { useState } from 'react';
import useUserStore from '../service/useUserStore';
import { FieldValues, Form, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex, Heading, Stack, Text, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import LoginService from '../service/LoginService';
import { AuthenticationRequest } from '../model/AppUser';
import { ToastWithCountdown } from './ToastWithCountdown';
import useErrorStore from '../service/useErrorState';

const schema = z.object({
  userEmail: z.string().email({ message: 'Niepoprawny adres email' }),
  userPassword: z.string().min(3, { message: 'Hasło zbyt krótkie' }),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const toast = useToast();
  const { login } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setError = useErrorStore(s => s.setError);

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    setError(undefined);
    const authRequest: AuthenticationRequest = {
      userEmail: data.userEmail,
      userPassword: data.userPassword,
    };
    const { request } = LoginService.login(authRequest);
    request
      .then(res => {
        login(res.data);
        LoginService.storeLoginData(res.data, () => {
          toast({
            position: 'bottom',
            status: 'warning',
            duration: null,
            render: () => <ToastWithCountdown timeInSeconds={60} />,
          });
        });
      })
      .catch(err => {
        if (err.response && err.response.data) {
          setError(err.response?.data);
        } else {
          console.log(err);
        }
      })
      .finally(() => setIsLoading(false));
  };
  errors.userEmail || (errors.userPassword && console.log(errors));

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align={'center'} h={'100vh'} justify={'center'} bg={'facebook.400'} color={'whiteAlpha.900'}>
          <Stack spacing={5} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Zaloguj się</Heading>
              <Text fontSize={'lg'} color={'gray.600'}></Text>
            </Stack>
            <Box rounded={'lg'} bg={'facebook.700'} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <FormControl id='email'>
                  <FormLabel>Adres email</FormLabel>
                  <Input type='email' {...register('userEmail')} />
                </FormControl>
                <FormControl id='password'>
                  <FormLabel>Hasło</FormLabel>
                  <Input type='password' {...register('userPassword')} />
                </FormControl>
              </Stack>
              <Stack spacing={10} mt={5}>
                <Button
                  disabled={!isValid}
                  isLoading={isLoading}
                  type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}
                >
                  Zaloguj
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
};
