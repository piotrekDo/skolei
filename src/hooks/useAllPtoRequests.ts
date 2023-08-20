import { useInfiniteQuery } from '@tanstack/react-query';
import { Page } from '../model/Page';
import { PtoRaw } from '../model/Pto';
import PtoService from '../service/PtoService';

const useAllPtoRequests = (userId: number) => {
  return useInfiniteQuery<Page<PtoRaw>, Error>({
    queryKey: ['usersPto', userId],
    queryFn: ({ pageParam = 1 }) =>
      PtoService.getAllRequestsByAppliersId(userId, { page: pageParam - 1, pageSize: 10 }),
    // staleTime: 1 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage.number);
      return !lastPage.last ? lastPage.number + 2 : undefined;
    },
  });
};

export default useAllPtoRequests;