import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';
import { useApiCrud } from 'api/useApiCrud';

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
