import { UserType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetUser = (userId: string | null) =>
  useApiQuery<UserType>({
    endpoint: `users/${userId}`,
    queryKey: ['user', userId],
    enabled: Boolean(userId),
  });
