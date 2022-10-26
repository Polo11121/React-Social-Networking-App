import { UserType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetUsersBySearchTerm = (searchTerm: string) =>
  useApiQuery<UserType[]>({
    endpoint: `users?searchTerm=${searchTerm}`,
    queryKey: ['users', searchTerm],
    enabled: Boolean(searchTerm),
  });
