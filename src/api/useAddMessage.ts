import { useApiCrud } from 'api/useApiCrud';

export const useAddMessage = (onSuccess: () => void) => {
  return useApiCrud({
    url: 'message',
    method: 'post',
    onSuccess,
  });
};
