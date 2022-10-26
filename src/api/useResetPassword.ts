import { useApiCrud } from 'api/useApiCrud';

export const useResetPassword = (onSuccess: () => void, token?: string) =>
  useApiCrud({
    url: `users/resetPassword/${token}`,
    method: 'patch',
    onSuccess,
  });
