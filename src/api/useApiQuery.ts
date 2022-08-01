import axios from 'axios';
import { useQuery } from 'react-query';

type UseApiQueryType = {
  endpoint: string;
  queryKey: string | (string | null)[];
  enabled?: boolean;
};

export const useApiQuery = <T>({
  endpoint,
  queryKey,
  enabled = false,
}: UseApiQueryType) => {
  const useApi = (): Promise<T> =>
    axios.get(`/api/v1/${endpoint}`).then((res) => res.data);

  const data = useQuery(queryKey, useApi, {
    enabled,
    cacheTime: Infinity,
  });

  return { ...data, data: data.data as T };
};
