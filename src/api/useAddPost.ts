import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';

export const useAddPost = (afterUpdate: () => void) => {
  const { invalidateUserData } = useAuthContext();

  const onSuccess = async () => {
    await invalidateUserData();
    afterUpdate();
    customToast({ text: 'Pomyślnie dodano post' });
  };

  return useApiCrud({
    url: 'posts',
    method: 'post',
    onSuccess,
  });
};
