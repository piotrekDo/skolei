import { useInfiniteQuery } from "@tanstack/react-query";
import { Page } from "../model/Page";
import { UserDtoRaw } from "../model/AppUser";
import UserService from "../service/UserService";

const useAllUsers = (pageSize: number ) => {
    return useInfiniteQuery<Page<UserDtoRaw>, Error>({
        queryKey: ['users'],
        queryFn: ({pageParam = 1}) => UserService.getAllUsers({page: pageParam -1, pageSize: pageSize}),
        staleTime: 1 * 60 * 1000, // 1mminuta
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage.number)
            return !lastPage.last ? lastPage.number + 2 : undefined;
          },
      });
}

export default useAllUsers;