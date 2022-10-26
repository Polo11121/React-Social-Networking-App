import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';
import { useApiCrud } from 'api/useApiCrud';

type UseEditPostPropsType = {
  postId: string;
  afterUpdate: () => void;
  method: 'patch' | 'delete';
};

export const useEditPost = ({
  postId,
  afterUpdate,
  method,
}: UseEditPostPropsType) => {
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
