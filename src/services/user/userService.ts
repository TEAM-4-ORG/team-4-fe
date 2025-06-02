import AxiosService from '../api/axiosService';
import { UserInfoResponse, BasicResponse, UserRequest } from './types';

class UserService extends AxiosService {
  getUserInfo(userId: number): Promise<UserInfoResponse> {
    return this.http.get(`/api/user/info/${userId}`);
  }

  createUser(data: UserRequest): Promise<BasicResponse> {
    return this.http.post(`/api/user/new`, data);
  }

  deleteUser(userId: number): Promise<BasicResponse> {
    return this.http.delete(`/api/user/delete/${userId}`);
  }

  updateUser(userId: number, data: UserRequest): Promise<BasicResponse> {
    return this.http.put(`/api/user/change/${userId}`, data);
  }
}

export const userService = new UserService();
