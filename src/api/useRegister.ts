import { AxiosResponse } from 'axios';
import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';

export const useRegister = () => {
  const { authenticationHandler } = useAuthContext();

  const onSuccess = (data: AxiosResponse<any, any>) => {
    authenticationHandler(data);
    customToast({ text: 'Pomyślnie utworzono konto' });
  };

  return useApiCrud({
    url: 'users/signup',
    method: 'post',
    onSuccess,
  });
};
