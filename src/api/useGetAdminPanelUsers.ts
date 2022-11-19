import { useInfiniteQuery } from 'react-query';
import { UserType } from 'shared/types/responseTypes';
import axios from 'axios';

type UseGetAdminPanelUsersResponseType = {
  hasNextPage: boolean;
  data: UserType[];
};

export const useGetAdminPanelUsers = (
  searchTerm: string,
  userAccountStatus?: string
) => {
  const getUsers = ({
    pageParam = 1,
  }): Promise<UseGetAdminPanelUsersResponseType> =>
    axios
      .get(
        `/api/v1/admin/users?page=${pageParam}&limit=10&searchTerm=${searchTerm}&status=${
          userAccountStatus || ''
        }`
      )
      .then((res) => res.data);

  const data = useInfiniteQuery(
    ['users', searchTerm, userAccountStatus],
    getUsers,
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasNextPage ? pages.length + 1 : undefined;
      },
      cacheTime: 0,
    }
  );

  return {
    ...data,
    // @ts-ignore
    results: data?.data?.pages[0]?.results || 0,
    data: data?.data?.pages?.map((user) => user.data).flat(1) || [],
  };
};
