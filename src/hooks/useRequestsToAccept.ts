import { useQuery } from '@tanstack/react-query';
import PtoService from '../service/PtoService';
import { PtoRaw } from '../model/Pto';

const useRequestsToAccept = (acceptorId: number) => {
    return useQuery<PtoRaw[], Error>({
        queryKey: ['requestsToAccept', acceptorId],
        queryFn: () => PtoService.getAllRequestsToAccept(acceptorId),
        // staleTime: 10 * 1000, //10sec
      });
}

export default useRequestsToAccept;