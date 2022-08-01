import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';

export const useDeletePost = (afterUpdate: () => void, postId: string) => {
  const { invalidateUserData } = useAuthContext();

  const onSuccess = async () => {
    await invalidateUserData();
    afterUpdate();
  };

  return useApiCrud({
    url: `posts/${postId}`,
    method: 'delete',
    onSuccess,
  });
};
