import { useApiQuery } from 'api/useApiQuery';
import { UserType } from 'shared/types/responseTypes';

export const useGetUsersBySearchTerm = (searchTerm: string) =>
  useApiQuery<UserType[]>({
    endpoint: `users?searchTerm=${searchTerm}`,
    queryKey: ['users', searchTerm],
    enabled: Boolean(searchTerm),
  });
