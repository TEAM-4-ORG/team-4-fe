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

// GET
export const useUserInfo = (
  userId: number,
  options?: Omit<UseQueryOptions<UserInfoResponse>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: userKeys.info(userId),
    queryFn: () => userService.getUserInfo(userId),
    ...options,
  });

// POST
export const useCreateUser = (
  payload: UserRequest,
  options?: Omit<
    UseMutationOptions<PostUserResponse, Error, UserRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: userKeys.create(),
    mutationFn: () => userService.createUser(payload),
    ...options,
  });

// DELETE
export const useDeleteUser = (
  userId: number,
  options?: Omit<UseMutationOptions<BasicResponse, Error, void>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: () => userService.deleteUser(userId),
    ...options,
  });

// PUT
export const useUpdateUser = (
  userId: number,
  payload: UserRequest,
  options?: Omit<
    UseMutationOptions<BasicResponse, Error, UserRequest>,
    'mutationFn'
  >
) =>
  useMutation({
    mutationFn: () => userService.updateUser(userId, payload),
    ...options,
  });
