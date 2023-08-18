import { Page, PageQuery } from '../model/Page';
import { PtoRaw } from '../model/Pto';
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
}
export default new PtoService();