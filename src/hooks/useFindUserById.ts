import { useQuery } from '@tanstack/react-query';
import { UserDtoRaw } from '../model/AppUser';
import UserService from '../service/UserService';

const useFindUserById = (userId: number) => {
  return useQuery<UserDtoRaw, Error>({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUserById(userId),
    // staleTime: 10 * 1000, //10sec
  });
};

export default useFindUserById;