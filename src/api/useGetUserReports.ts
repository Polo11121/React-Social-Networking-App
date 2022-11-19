import { ReportType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetUserReports = (userId: string | null) =>
  useApiQuery<ReportType[]>({
    endpoint: `report/user/${userId}`,
    queryKey: ['userReports', userId],
    enabled: Boolean(userId),
  });
