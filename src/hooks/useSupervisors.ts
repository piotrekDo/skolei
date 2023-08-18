import { useQuery } from '@tanstack/react-query';
import { UserDtoRaw } from "../model/AppUser";
import UserService from '../service/UserService';


const useSupervisors = (userId: number) => {
    return useQuery<UserDtoRaw[], Error>({
        queryKey: ['supervisord', userId],
        queryFn: () => UserService.getSupervisors(userId),
        staleTime: 1 * 60 * 1000,
        keepPreviousData: true,
    });
};

export default useSupervisors;