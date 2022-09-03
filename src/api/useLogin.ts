import { AxiosResponse } from 'axios';
import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';

export const useLogin = () => {
  const { authenticationHandler } = useAuthContext();

  const onSuccess = (data: AxiosResponse<any, any>) => {
    authenticationHandler(data);
    customToast({ text: 'Pomyślnie zalogowano' });
  };

  return useApiCrud({
    url: 'users/login',
    method: 'post',
    onSuccess,
  });
};
