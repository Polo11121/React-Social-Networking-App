import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';

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
  };

  return useApiCrud({
    url: `posts/${postId}`,
    method: 'patch',
    onSuccess,
  });
};
