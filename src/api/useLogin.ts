import axios, { AxiosError } from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { ResponseErrorType } from 'shared/types/responseTypes';

type UseLoginType = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { authenticationHandler } = useAuthContext();
  const [error, setError] = useState<string | undefined>('');

  const login = ({ email, password }: UseLoginType) =>
    axios.post('users/login', { email, password });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: authenticationHandler,
    onError: (errorResponse: AxiosError<ResponseErrorType>) =>
      setError(errorResponse.response?.data.message),
  });

  return { mutate, isLoading, error };
};
