import { ReportType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetNewReports = () =>
  useApiQuery<ReportType[]>({
    endpoint: 'report/new',
    queryKey: ['reports', 'new'],
  });
