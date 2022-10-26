import { useApiCrud } from 'api/useApiCrud';

export const useConfirmEmail = (token?: string) =>
  useApiCrud({
    url: `users/confirmEmail/${token}`,
    method: 'patch',
  });
