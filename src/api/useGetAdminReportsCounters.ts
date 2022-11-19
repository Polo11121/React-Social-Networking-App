import { ReportsCountersType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetAdminReportsCounters = (adminId: string | null) =>
  useApiQuery<ReportsCountersType>({
    endpoint: `admin/${adminId}/reportsCounters`,
    queryKey: ['administratorCounters', adminId],
  });
