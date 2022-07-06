import axios from 'axios';
import { useQuery } from 'react-query';

export const useGetUser = (userId: string | null) => {
  const getUser = () => axios.get(`users/${userId}`);

  const { data, isLoading } = useQuery(['user', userId], getUser, {
    enabled: Boolean(userId),
    cacheTime: Infinity,
  });

  if (!isLoading && data) {
    return { data, isLoading };
  }

  return { data: {}, isLoading };
};
