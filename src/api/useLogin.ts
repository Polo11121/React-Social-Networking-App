import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';

export const useLogin = () => {
  const { authenticationHandler } = useAuthContext();

  return useApiCrud({
    url: 'users/login',
    method: 'post',
    onSuccess: authenticationHandler,
  });
};
