import { useApiCrud } from 'api/useApiCrud';
import { customToast } from 'shared/hooks/customToast';

export const useChangePassword = () => {
  const onSuccess = () =>
    customToast({ text: 'Pomyślnie zaktualizowano hasło' });

  return useApiCrud({
    url: 'users/updateMyPassword',
    method: 'patch',
    onSuccess,
  });
};
