import { useApiCrud } from 'api/useApiCrud';

export const useAddMessage = (onSuccess: () => void) => {
  return useApiCrud({
    url: 'messages',
    method: 'post',
    onSuccess,
  });
};
