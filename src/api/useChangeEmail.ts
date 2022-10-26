import { useApiCrud } from 'api/useApiCrud';

export const useChangeEmail = (onSuccess: () => void) =>
  useApiCrud({
    url: 'users/changeEmail',
    method: 'patch',
    onSuccess,
  });
