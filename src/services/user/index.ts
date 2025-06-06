import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { userKeys } from './keys';
import { userService } from './userService';
import {
  UserRequest,
  UserInfoResponse,
  BasicResponse,
  PostUserResponse,
} from './types';

export const useUserInfo = (
  userId: number,
  options?: Omit<UseQueryOptions<UserInfoResponse>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: userKeys.info(userId),
    // queryFn: () => userService.getUserInfo(userId),
    queryFn: () => {
      return {
        user_id: userId,
        birth: '2000-12-19',
        time: '11:45',
        gender: false, // true는 남성,
        projects: [
          // 최신순 정렬
          {
            project_id: 1,
            title: '사주 정보 분석',
            type: 'SAJU',
          },
          {
            project_id: 2,
            title: '타로로 보는 올해 연애운',
            type: 'TAROT',
          },
        ],
      };
    },
    ...options,
  });

export const useCreateUser = (
  options?: Omit<
    UseMutationOptions<PostUserResponse, Error, UserRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: userKeys.create(),
    // mutationFn: (payload: UserRequest) => userService.createUser(payload),
    mutationFn: (payload: UserRequest) => {
      return {
        isSuccess: true,
        code: 'COMMON200',
        message: '유저 추가에 성공했습니다.',
        result: {
          user_id: Math.random(),
        },
      };
    },
    ...options,
  });

export const useDeleteUser = (
  options?: Omit<UseMutationOptions<BasicResponse, Error, number>, 'mutationFn'>
) =>
  useMutation({
    // mutationFn: (userId: number) => userService.deleteUser(userId),
    mutationFn: (userId: number) => {
      return {
        isSuccess: true,
        code: 'COMMON200',
        message: '유저 삭제에 성공했습니다.',
      };
    },
    ...options,
  });

export const useUpdateUser = (
  options?: Omit<
    UseMutationOptions<
      BasicResponse,
      Error,
      { userId: number; payload: UserRequest }
    >,
    'mutationFn'
  >
) =>
  useMutation({
    mutationFn: ({ userId, payload }) =>
      userService.updateUser(userId, payload),
    ...options,
  });
