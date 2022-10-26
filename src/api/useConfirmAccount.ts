import { useApiCrud } from 'api/useApiCrud';

export const useConfirmAccount = (token?: string) =>
  useApiCrud({
    url: `users/confirmAccount/${token}`,
    method: 'patch',
  });
