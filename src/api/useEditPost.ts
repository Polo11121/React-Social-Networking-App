import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';

type UseEditPostType = {
  postId: string;
  afterUpdate: () => void;
  method: 'patch' | 'delete';
};

export const useEditPost = ({
  postId,
  afterUpdate,
  method,
}: UseEditPostType) => {
  const { invalidateUserData } = useAuthContext();

  const onSuccess = async () => {
    await invalidateUserData();
    afterUpdate();
    customToast({
      text: `Pomyślnie ${method === 'delete' ? 'usunięto' : 'zedytowano'} post`,
    });
  };

  return useApiCrud({
    url: `posts/${postId}`,
    method,
    onSuccess,
  });
};
