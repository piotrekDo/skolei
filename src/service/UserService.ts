import { UserDtoRaw } from '../model/AppUser';
import { Page, PageQuery } from '../model/Page';
import APIclient from './APIclient';

class UserService {
  getUserById(userId: number) {
    return APIclient.get<UserDtoRaw>('/users/by-id', {
      params: {
        id: userId,
      },
    }).then(res => res.data);
  }

  getAllUsers(query: PageQuery) {
    return APIclient.get<Page<UserDtoRaw>>('/users/all', {
      params: {
        page: query.page,
        size: query.pageSize,
      },
    }).then(res => {
      return res.data;
    });
  }

  getSupervisors(userId: number) {
    return APIclient.get<UserDtoRaw[]>('/users/supervisors-by-id', {
      params: {
        id: userId,
      },
    }).then(res => res.data);
  }
}

export default new UserService();
