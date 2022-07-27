import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { useMutation } from 'react-query';

export const useLogout = () => {
  const { authenticationHandler } = useAuthContext();

  const logout = () => axios.get('/api/v1/users/logout');

  const { mutate, isLoading } = useMutation(logout, {
    onSuccess: authenticationHandler,
  });

  return { mutate, isLoading };
};
