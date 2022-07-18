import { useApiGet } from 'api/useApiGet';
import { UserType } from 'shared/types/responseTypes';

export const useGetUser = (userId: string | null) =>
  useApiGet<UserType>({
    endpoint: `users/${userId}`,
    queryKey: ['user', userId],
    enabled: Boolean(userId),
  });
