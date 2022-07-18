import axios from 'axios';
import { useQuery } from 'react-query';

type UseApiGetType = {
  endpoint: string;
  queryKey: string | (string | null)[];
  enabled?: boolean;
};

export const useApiGet = <T>({
  endpoint,
  queryKey,
  enabled = false,
}: UseApiGetType) => {
  const useApi = (): Promise<T> => axios.get(endpoint).then((res) => res.data);

  const { data, isLoading } = useQuery(queryKey, useApi, {
    enabled,
    cacheTime: Infinity,
  });

  if (data) {
    return { data, isLoading };
  }

  return { data: [], isLoading };
};
