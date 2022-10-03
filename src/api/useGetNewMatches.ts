import { useApiQuery } from 'api/useApiQuery';

export const useGetNewMatches = () =>
  useApiQuery<number>({
    endpoint: 'matches/newMatches',
    queryKey: 'newMatches',
    defaultZero: true,
  });
