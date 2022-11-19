import { UserType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetAdministrators = () =>
  useApiQuery<UserType[]>({
    endpoint: 'admin',
    queryKey: 'administrators',
  });
