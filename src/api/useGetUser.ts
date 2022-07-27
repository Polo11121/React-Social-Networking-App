import { useApiQuery } from 'api/useApiQuery';
import { UserType } from 'shared/types/responseTypes';

export const useGetUser = (userId: string | null) =>
  useApiQuery<UserType>({
    endpoint: `users/${userId}`,
    queryKey: ['user', userId],
    enabled: Boolean(userId),
  });
