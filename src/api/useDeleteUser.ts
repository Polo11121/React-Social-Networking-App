import { useApiCrud } from 'api/useApiCrud';
import { useLogout } from 'api/useLogout';

export const useDeleteUser = () => {
  const { mutate } = useLogout('Pomyślnie usunięto konto');

  const onSuccess = () => mutate();

  return useApiCrud({
    url: 'users/deleteUser',
    method: 'patch',
    onSuccess,
  });
};
