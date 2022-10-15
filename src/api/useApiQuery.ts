import { useQuery } from 'react-query';
import axios from 'axios';

type UseApiQueryType = {
  endpoint: string;
  queryKey: string | (string | null)[];
  enabled?: boolean;
  defaultZero?: boolean;
  onSuccess?: (data: any) => void;
  refetchOnWindowFocus?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean;
};

export const useApiQuery = <T>({
  endpoint,
  queryKey,
  onSuccess,
  enabled = true,
  defaultZero = false,
  refetchOnWindowFocus = true,
  refetchOnMount = false,
}: UseApiQueryType) => {
  const useApi = (): Promise<T> =>
    axios.get(`/api/v1/${endpoint}`).then((res) => res.data);

  const data = useQuery(queryKey, useApi, {
    enabled,
    onSuccess,
    refetchOnWindowFocus,
    refetchOnMount,
  });

  const defaultValue = defaultZero ? 0 : [];

  return { ...data, data: (data.data?.data || defaultValue) as T };
};
