import { ReportsCountersType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetDashboardCounters = () =>
  useApiQuery<ReportsCountersType>({
    endpoint: 'admin/dashboardCounters',
    queryKey: 'dashboardCounters',
  });
