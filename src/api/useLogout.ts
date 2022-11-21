import axios from 'axios';
import { customToast } from 'shared/hooks/customToast';
import { useAuthContext } from 'contexts/AuthContext';
import { useMutation, useQueryClient } from 'react-query';

export const useLogout = (text: string = 'Pomyślnie wylogowano') => {
  const { authenticationHandler } = useAuthContext();
  const queryClient = useQueryClient();

  const logout = () => axios.get('/api/v1/users/logout');

  const onSuccess = () => {
    authenticationHandler({ data: null });
    queryClient.clear();

    if (text) {
      customToast({ text });
    }
  };

  return useMutation(logout, {
    onSuccess,
  });
};
