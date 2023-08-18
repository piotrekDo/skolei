import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Link,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import useUserStore from '../service/useUserStore';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const toast = useToast();
  const { appUser, logout } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!appUser) return null;

  const isModerator: boolean = appUser.userRoles.findIndex(val => val === 'MODERATOR') > -1;

  return (
    <>
      <Box color={'white'} bg={'facebook.600'} px={{ base: 1, sm: 10 }} >
        <Flex h={'50px'} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} w={'200vw'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} px={{ base: 20 }} display={{ base: 'none', md: 'flex' }}>
              {isModerator && <NavLink to={'/users'}>Użytkownicy</NavLink>}
              <Menu>
                <MenuButton>Wnioski</MenuButton>
                <MenuList bg={'facebook.700'}>
                  <MenuItem bg={'facebook.700'} _hover={{bg: 'facebook.500'}} as={NavLink} to='applications-new'>Nowy</MenuItem>
                  <MenuItem bg={'facebook.700'} _hover={{bg: 'facebook.500'}} as={NavLink} to='applications-history'>Historia</MenuItem>
                  {isModerator && <MenuItem bg={'facebook.700'} _hover={{bg: 'facebook.500'}} as={NavLink} to='applications'>Zaakaceptuj</MenuItem>}
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} leftIcon={<AddIcon />}>
              Action
            </Button>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size={'sm'} src={''} />
              </MenuButton>
              <MenuList bg={'facebook.700'}>
                <Text w={'100%'} textAlign={'center'}>
                  {appUser.firstName}
                </Text>
                <Text w={'100%'} textAlign={'center'}>
                  {appUser.userEmail}
                </Text>
                <MenuDivider />
                <Box py={2} px={5}>
                  <Button
                    colorScheme='messenger'
                    w={'100%'}
                    onClick={() => {
                      toast.closeAll();
                      logout();
                    }}
                  >
                    Wyloguj
                  </Button>
                </Box>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Box as={Link}>Dashboard</Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
