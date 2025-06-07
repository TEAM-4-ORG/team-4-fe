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
    queryFn: () => userService.getUserInfo(userId),
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
    mutationFn: (payload: UserRequest) => userService.createUser(payload),
    ...options,
  });

export const useDeleteUser = (
  options?: Omit<UseMutationOptions<BasicResponse, Error, number>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: (userId: number) => userService.deleteUser(userId),
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
