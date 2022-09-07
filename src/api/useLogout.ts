import axios, { AxiosResponse } from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { useMutation } from 'react-query';
import { customToast } from 'shared/hooks/customToast';

export const useLogout = () => {
  const { authenticationHandler } = useAuthContext();

  const logout = () => axios.get('/api/v1/users/logout');

  const onSuccess = (data: AxiosResponse<any, any>) => {
    authenticationHandler(data);
    customToast({ text: 'Pomyślnie wylogowano' });
  };

  return useMutation(logout, {
    onSuccess,
  });
};
