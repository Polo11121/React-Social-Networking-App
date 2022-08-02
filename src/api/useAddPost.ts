import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';

export const useAddPost = (afterUpdate: () => void) => {
  const { invalidateUserData } = useAuthContext();

  const onSuccess = async () => {
    await invalidateUserData();
    afterUpdate();
  };

  return useApiCrud({
    url: 'posts',
    method: 'post',
    onSuccess,
  });
};
