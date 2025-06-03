export const userKeys = {
  info: (userId: number) => ['user', 'info', userId] as const,
  create: () => ['user', 'create'] as const,
  delete: (userId: number) => ['user', 'delete', userId] as const,
  update: (userId: number) => ['user', 'update', userId] as const,
};
