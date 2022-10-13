import { useApiCrud } from 'api/useApiCrud';

export const useAddMessage = (onSuccess: () => void) =>
  useApiCrud({
    url: 'messages',
    method: 'post',
    onSuccess,
  });
