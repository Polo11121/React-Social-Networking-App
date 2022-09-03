import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';

export const useDeletePost = ({
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
    customToast({ text: 'Pomyślnie usunięto post' });
  };

  return useApiCrud({
    url: `posts/${postId}`,
    method: 'delete',
    onSuccess,
  });
};
