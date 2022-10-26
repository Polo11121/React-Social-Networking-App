import { useApiCrud } from 'api/useApiCrud';

export const useRegister = (onSuccess: () => void) =>
  useApiCrud({
    url: 'users/signup',
    method: 'post',
    onSuccess,
  });
