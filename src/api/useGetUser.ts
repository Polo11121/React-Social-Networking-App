import axios from 'axios';
import { useQuery } from 'react-query';
import { UserType } from 'shared/types/responseTypes';

export const useGetUser = (userId: string | null) => {
  const getUser = (): Promise<UserType> =>
    axios.get(`users/${userId}`).then((res) => res.data);

  const { data, isLoading } = useQuery(['user', userId], getUser, {
    enabled: Boolean(userId),
    cacheTime: Infinity,
  });

  if (!isLoading && data) {
    return { data, isLoading };
  }

  return { data: {}, isLoading };
};
