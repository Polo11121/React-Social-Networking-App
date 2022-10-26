import { customToast } from 'shared/hooks/customToast';
import { useApiCrud } from 'api/useApiCrud';

export const useForgotPassword = () => {
  const onSuccess = () =>
    customToast({
      text: 'Na podany adres e-mail wysłano link do zresetowania hasła',
    });

  return useApiCrud({
    url: 'users/forgotPassword',
    method: 'post',
    onSuccess,
  });
};
