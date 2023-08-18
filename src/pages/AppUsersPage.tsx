import React, { useEffect, useState } from 'react';
import useAllUsers from '../hooks/useAllUsers';
import { Box, Button, VStack } from '@chakra-ui/react';
import { UserDtoRaw } from '../model/AppUser';
import { AppUserContainer } from '../components/AppUserContainer';

export const AppUsersPage = () => {
  // const pageSize = 5;
  // const { data, error, isLoading, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useAllUsers(pageSize);

  // if (isFetching) return <p>Loading...</p>;

  // if (error) return <p>{error.message}</p>;

  // const totalUsers = data?.pages[data?.pages.length - 1].totalElements;
  // const users: UserDtoRaw[] = [];
  // data?.pages.map(page => page.content).forEach(content => content.forEach(user => users.push(user)));
  // console.log(users);

  return (
    <Box p={10}>
      {/* <Button
        isDisabled={isFetchingNextPage || !hasNextPage}
        onClick={() => {
          if (!hasNextPage) return;
          fetchNextPage();
        }}
      >
        plus
      </Button>
      <VStack w={'100%'}>{users.length > 0 && users.map(u => <AppUserContainer key={u.id} user={u} />)}</VStack> */}
    </Box>
  );
};
