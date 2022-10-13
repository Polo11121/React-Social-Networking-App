import { AllMatchesType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';
import { useQueryClient } from 'react-query';

export const useGetMatches = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => queryClient.invalidateQueries('newMatches');

  return useApiQuery<AllMatchesType>({
    endpoint: 'matches',
    queryKey: 'matches',
    onSuccess,
  });
};
