import { Box, Flex, Menu, MenuButton, MenuList, Tooltip } from '@chakra-ui/react';
import { IoNotificationsOutline, IoNotificationsSharp } from 'react-icons/io5';
import { NewPtoRequestEvent, PtoRequestResolvedEvent, Event } from '../model/Notification';
import useAppNotificationsStore from '../service/useAppNotificationsStore';
import { useNavigate } from 'react-router-dom';

export const NavbarNotifications = () => {
  const { notifications, unreadNotifications, clearUnreadNotifications } = useAppNotificationsStore();
  const navigate = useNavigate();
  return (
    <Flex mx={10}>
      <Menu>
        <MenuButton
          onClick={() => {
            unreadNotifications > 0 && clearUnreadNotifications();
          }}
        >
          {unreadNotifications > 0 ? <IoNotificationsSharp size={'2rem'} /> : <IoNotificationsOutline size={'2rem'} />}
        </MenuButton>
        <MenuList bg={'facebook.700'} p={5}>
          {notifications.length === 0 && <Box>Brak nowych powiadomień</Box>}
          {notifications.length > 0 &&
            notifications.map((n, index) => (
              <Box key={index} cursor={'pointer'}>
                {n.id === 'NEW_PTO_REQUEST' && (
                  <Box my={1} fontSize={'.8rem'} w={'100%'} padding={2} borderRadius={'10px'} bg={'facebook.600'} onClick={() => navigate('/applications-resolve')}>
                    <Box>{new Date((n as Event).dateTime).toLocaleString()}</Box>
                    <Box>
                    Nowy wniosek {(n as NewPtoRequestEvent).applierFirstName}
                    {(n as NewPtoRequestEvent).applierLastName}
                    </Box>
                  </Box>
                )}
                {n.id === 'PTO_REQUEST_RESOLVED' && (
                  <Box my={1} fontSize={'.8rem'} w={'100%'} padding={2} borderRadius={'10px'} bg={'facebook.600'} onClick={() => navigate('/applications-history')}>
                    Urlop w dniach {(n as PtoRequestResolvedEvent).ptoStart} - {(n as PtoRequestResolvedEvent).ptoEnd}
                    został {(n as PtoRequestResolvedEvent).accepted ? 'zaakceptowany' : 'odrzucony'}
                  </Box>
                )}
              </Box>
            ))}
        </MenuList>
      </Menu>
    </Flex>
  );

  //   return (
  //     <Box mx={10}>
  //     {notifications.length === 0 && (
  //       <Tooltip label='Nie masz nowych powiadomień'>
  //         <Box>
  //           <IoNotificationsOutline size={'2rem'} />
  //         </Box>
  //       </Tooltip>
  //     )}
  //     {notifications.length > 0 && (
  //       <Menu>
  //         <MenuButton>
  //           <IoNotificationsSharp size={'2rem'} />
  //         </MenuButton>
  //         <MenuList bg={'facebook.700'}>
  //           {notifications.map((n, index) => (
  //             <Box key={index}>
  //               {n.id === 'NEW_PTO_REQUEST' && (
  //                 <Box fontSize={'.8rem'}>
  //                   Nowy wniosek {(n as NewPtoRequestEvent).applierFirstName}{' '}
  //                   {(n as NewPtoRequestEvent).applierLastName}
  //                 </Box>
  //               )}
  //               {n.id === 'PTO_REQUEST_RESOLVED' && (
  //                 <Box fontSize={'.8rem'}>
  //                   Urlop w dniach {(n as PtoRequestResolvedEvent).ptoStart} -{' '}
  //                   {(n as PtoRequestResolvedEvent).ptoEnd} został{' '}
  //                   {(n as PtoRequestResolvedEvent).accepted ? 'zaakceptowany' : 'odrzucony'}
  //                 </Box>
  //               )}
  //             </Box>
  //           ))}
  //         </MenuList>
  //       </Menu>
  //     )}
  //   </Box>
  //   )
};
