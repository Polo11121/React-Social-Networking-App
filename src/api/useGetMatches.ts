import { useApiQuery } from 'api/useApiQuery';
import { useQueryClient } from 'react-query';
import { MatchType } from 'shared/types/responseTypes';

export const useGetMatches = () => {
  const queryClient = useQueryClient();

  const matches = useApiQuery<MatchType[]>({
    endpoint: 'matches',
    queryKey: 'matches',
    onSuccess: () => queryClient.invalidateQueries('newMatches'),
  });

  return matches;
};
