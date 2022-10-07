import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { ResponseErrorType } from 'shared/types/responseTypes';

type UseApiType = {
  url: string;
  method: 'post' | 'patch' | 'delete' | 'put';
  onSuccess?: (data: any) => void;
};

export const useApiCrud = ({ url, method, onSuccess }: UseApiType) => {
  const [error, setError] = useState<string | undefined>();

  const api = (data: Record<any, any>) =>
    axios({
      method,
      url: `/api/v1/${url}`,
      data,
    });

  const resetError = () => setError(undefined);

  return {
    ...useMutation(api, {
      onSuccess,
      onError: (errorResponse: AxiosError<ResponseErrorType>) =>
        setError(errorResponse.response?.data.message),
    }),
    error,
    resetError,
  };
};
