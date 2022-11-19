import { useInfiniteQuery } from 'react-query';
import { ReportType } from 'shared/types/responseTypes';
import axios from 'axios';

type UseGetReportsResponseType = {
  hasNextPage: boolean;
  data: ReportType[];
};

type UseGetReportsPropsType = {
  searchTerm?: string;
  adminId?: string | null;
  status?: string;
};

export const useGetReports = ({
  searchTerm,
  adminId,
  status,
}: UseGetReportsPropsType) => {
  const getReports = ({ pageParam = 1 }): Promise<UseGetReportsResponseType> =>
    axios
      .get(
        `/api/v1/report?page=${pageParam}&limit=10&searchTerm=${searchTerm}&status=${
          status || ''
        }&admin=${adminId || ''}`
      )
      .then((res) => res.data);

  const data = useInfiniteQuery(
    ['reports', status, adminId, searchTerm],
    getReports,
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
    data: data?.data?.pages?.map((report) => report.data).flat(1) || [],
  };
};
