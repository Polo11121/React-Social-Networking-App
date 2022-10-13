import { useApiCrud } from 'api/useApiCrud';

export const useForgotPassword = () =>
  useApiCrud({
    url: 'users/forgotPassword',
    method: 'post',
  });
