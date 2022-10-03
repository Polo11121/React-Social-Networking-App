import axios from 'axios';
import { useQuery } from 'react-query';

type UseApiQueryType = {
  endpoint: string;
  queryKey: string | (string | null)[];
  enabled?: boolean;
  defaultZero?: boolean;
  onSuccess?: (data: any) => void;
};

export const useApiQuery = <T>({
  endpoint,
  queryKey,
  enabled = true,
  defaultZero = false,
  onSuccess,
}: UseApiQueryType) => {
  const useApi = (): Promise<T> =>
    axios.get(`/api/v1/${endpoint}`).then((res) => res.data);

  const data = useQuery(queryKey, useApi, {
    enabled,
    cacheTime: Infinity,
    onSuccess,
  });

  const defaultValue = defaultZero ? 0 : [];

  return { ...data, data: (data.data?.data || defaultValue) as T };
};
