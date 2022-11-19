import { useApiCrud } from 'api/useApiCrud';

export const useUnblockUser = (userId: string, onSuccess: () => void) =>
  useApiCrud({
    url: `admin/user/${userId}/unblock`,
    method: 'patch',
    onSuccess,
  });
