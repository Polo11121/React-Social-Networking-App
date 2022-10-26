import { customToast } from 'shared/hooks/customToast';
import { useApiCrud } from 'api/useApiCrud';

export const useChangePassword = () => {
  const onSuccess = () => customToast({ text: 'Pomyślnie zmieniono hasło' });

  return useApiCrud({
    url: 'users/updatePassword',
    method: 'patch',
    onSuccess,
  });
};
