import { useQuery, useMutation } from '@tanstack/react-query';
import { userKeys } from './keys';
import { userService } from './userService';
import { UserRequest } from './types';

// GET
export const useUserInfo = (userId: number) =>
  useQuery({
    queryKey: userKeys.info(userId),
    queryFn: () => userService.getUserInfo(userId),
  });

// POST
export const useCreateUser = (payload: UserRequest) =>
  useMutation({
    mutationKey: userKeys.create(),
    mutationFn: () => userService.createUser(payload),
  });

// DELETE
export const useDeleteUser = (userId: number) =>
  useMutation({
    mutationFn: () => userService.deleteUser(userId),
  });

// PUT
export const useUpdateUser = (userId: number, payload: UserRequest) =>
  useMutation({
    mutationFn: () => userService.updateUser(userId, payload),
  });
