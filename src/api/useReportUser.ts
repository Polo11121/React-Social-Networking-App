import { useApiCrud } from 'api/useApiCrud';

export const useReportUser = (onSuccess: () => void) =>
  useApiCrud({
    url: 'report',
    method: 'post',
    onSuccess,
  });
