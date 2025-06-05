import AxiosService from '../api/axiosService';
import {
  UserInfoResponse,
  BasicResponse,
  UserRequest,
  PostUserResponse,
} from './types';

class UserService extends AxiosService {
  constructor() {
    super('/api/user');
  }
  getUserInfo(userId: number): Promise<UserInfoResponse> {
    return this.http.get(`/info/${userId}`);
  }

  createUser(data: UserRequest): Promise<PostUserResponse> {
    return this.http.post(`/new`, data);
  }

  deleteUser(userId: number): Promise<BasicResponse> {
    return this.http.delete(`/delete/${userId}`);
  }

  updateUser(userId: number, data: UserRequest): Promise<BasicResponse> {
    return this.http.put(`/change/${userId}`, data);
  }
}

export const userService = new UserService();
