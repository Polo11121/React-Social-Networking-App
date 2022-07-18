import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';

export const useRegister = () => {
  const { authenticationHandler } = useAuthContext();

  return useApiCrud({
    url: 'users/signup',
    method: 'post',
    onSuccess: authenticationHandler,
  });
};
