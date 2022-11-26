import { customToast } from 'shared/hooks/customToast';
import { useApiCrud } from 'api/useApiCrud';
import axios, { AxiosResponse } from 'axios';

export const useChangePassword = () => {
  const onSuccess = (data: AxiosResponse<any, any>) => {
    if (process.env.NODE_ENV === 'production') {
      localStorage.setItem('token', data.data.token);

      axios.defaults.headers.common = {
        Authorization: `Bearer ${data.data.token}`,
      };
    }

    customToast({ text: 'Pomyślnie zmieniono hasło' });
  };

  return useApiCrud({
    url: 'users/updatePassword',
    method: 'patch',
    onSuccess,
  });
};
