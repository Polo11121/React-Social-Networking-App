import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { ResponseErrorType } from 'shared/types/responseTypes';

export const useForgotPassword = () => {
  const [error, setError] = useState<string | undefined>('');

  const forgotPassword = ({ email }: { email: string }) =>
    axios.post('users/forgotPassword', { email });

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onError: (errorResponse: AxiosError<ResponseErrorType>) =>
      setError(errorResponse.response?.data.message),
  });

  return { mutate, isLoading, error };
};
