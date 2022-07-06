import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { useMutation } from 'react-query';

type UseRegisterType = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const useRegister = () => {
  const { authenticationHandler } = useAuthContext();

  const register = ({
    name,
    email,
    password,
    passwordConfirm,
  }: UseRegisterType) =>
    axios.post('users/signup', { name, email, password, passwordConfirm });

  const { mutate, isLoading } = useMutation(register, {
    onSuccess: authenticationHandler,
  });

  return { mutate, isLoading };
};
