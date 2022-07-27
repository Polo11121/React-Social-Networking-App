import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';

export const useUpdateMe = (afterUpdate: () => void) => {
  const { invalidateUserData } = useAuthContext();

  const onSuccess = async () => {
    await invalidateUserData();
    afterUpdate();
  };

  return useApiCrud({
    url: 'users/updateMe',
    method: 'patch',
    onSuccess,
  });
};
