import { useApiCrud } from 'api/useApiCrud';
import { useQueryClient } from 'react-query';

export const useMatch = (userId?: string) => {
  const queryClient = useQueryClient();

  const onSuccess = () =>
    userId && queryClient.invalidateQueries(['user', userId]);

  return useApiCrud({
    url: 'matches/match',
    method: 'put',
    onSuccess,
  });
};
