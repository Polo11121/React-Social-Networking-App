import { useApiCrud } from 'api/useApiCrud';

export const useUpdateReport = (reportId: string) =>
  useApiCrud({
    url: `report/${reportId}`,
    method: 'patch',
  });
