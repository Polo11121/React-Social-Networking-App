import { useApiCrud } from 'api/useApiCrud';

export const useForgotPassword = () => {
  return useApiCrud({
    url: 'users/forgotPassword',
    method: 'post',
  });
};
