import { customToast } from 'shared/hooks/customToast';
import { useAuthContext } from 'contexts/AuthContext';
import { useApiCrud } from 'api/useApiCrud';

export const useUpdateUser = ({
  afterUpdate,
  toastText,
}: {
  afterUpdate?: () => void;
  toastText?: string;
}) => {
  const { invalidateUserData } = useAuthContext();

  const onSuccess = async () => {
    await invalidateUserData();

    if (afterUpdate) {
      afterUpdate();
    }

    if (toastText) {
      customToast({ text: toastText });
    }
  };

  return useApiCrud({
    url: 'users/updateUser',
    method: 'patch',
    onSuccess,
  });
};
