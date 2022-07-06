import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { useMutation } from 'react-query';

type UseLoginType = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { authenticationHandler } = useAuthContext();

  const login = ({ email, password }: UseLoginType) =>
    axios.post('users/login', { email, password });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: authenticationHandler,
  });

  return { mutate, isLoading };
};
