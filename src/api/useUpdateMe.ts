import { useApiCrud } from 'api/useApiCrud';
import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';

export const useUpdateMe = ({
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
    url: 'users/updateMe',
    method: 'patch',
    onSuccess,
  });
};
