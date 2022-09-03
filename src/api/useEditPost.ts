import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';

export const useEditPost = ({
  postId,
  afterUpdate,
}: {
  postId: string;
  afterUpdate: () => void;
}) => {
  const { invalidateUserData } = useAuthContext();

  const onSuccess = async () => {
    await invalidateUserData();
    afterUpdate();
    customToast({ text: 'Pomyślnie zedytowano post' });
  };

  return useApiCrud({
    url: `posts/${postId}`,
    method: 'patch',
    onSuccess,
  });
};
