import { AxiosResponse } from 'axios';
import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';

export const useLogin = () => {
  const { authenticationHandler } = useAuthContext();

  const onSuccess = (data: AxiosResponse<any, any>) =>
    authenticationHandler(data);

  return useApiCrud({
    url: 'users/login',
    method: 'post',
    onSuccess,
  });
};
