import { customToast } from 'shared/hooks/customToast';
import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';
import { AxiosResponse } from 'axios';

export const useChangePassword = () => {
  const { authenticationHandler } = useAuthContext();

  const onSuccess = (data: AxiosResponse<any, any>) => {
    authenticationHandler(data);
    customToast({ text: 'Pomyślnie zmieniono hasło' });
  };

  return useApiCrud({
    url: 'users/updatePassword',
    method: 'patch',
    onSuccess,
  });
};
