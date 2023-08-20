import { Page, PageQuery } from '../model/Page';
import { PtoRaw, PtoResolve } from '../model/Pto';
import APIclient from './APIclient';

class PtoService {
  getAllRequestsByAppliersId(userId: number, query: PageQuery) {
    return APIclient.get<Page<PtoRaw>>('/pto/all-by-applier-id', {
      params: {
        userId: userId,
        page: query.page,
        size: query.pageSize,
      },
    }).then(res => {
      return res.data;
    });
  }

  getAllRequestsToAccept(acceptorId: number) {
    return APIclient.get<PtoRaw[]>('/pto/request-to-accept', {
      params: {
        acceptorId: acceptorId,
      },
    }).then(res => {
      return res.data;
    });
  }

  resolvePtoRequest(resolve: PtoResolve) {
    return APIclient.post<PtoRaw>('/pto/resolve-request', resolve).then(res => res.data);
  }
}
export default new PtoService();
