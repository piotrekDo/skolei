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

export default function Navbar() {
  const toast = useToast();
  const { appUser, logout } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!appUser) return null;

  return (
    <>
      <Box color={'white'} bg={'facebook.600'} px={{ base: 1, sm: 10 }}>
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
              <Box as={Link}>Dashboard</Box>
              <Menu>
                <MenuButton>Projekty</MenuButton>
                <MenuList bg={'facebook.700'}>
                  <MenuItem as={Link}>Text extractor</MenuItem>
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
                  <Button colorScheme='messenger' w={'100%'} onClick={() => {
                    toast.closeAll();
                    logout();
                  }}>
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
