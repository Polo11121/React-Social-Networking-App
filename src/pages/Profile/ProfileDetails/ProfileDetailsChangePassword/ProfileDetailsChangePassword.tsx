import { useEffect } from 'react';
import { ChangePasswordSchema } from 'pages/Profile/ProfileDetails/ProfileDetailsChangePassword//ChangePasswordSchema';
import { Input, Button } from 'components';
import { useForm } from 'shared/hooks/useForm';
import { useChangePassword } from 'api/useChangePassword';

export const ProfileDetailsChangePassword = () => {
  const {
    mutateAsync: mutate,
    isLoading,
    error,
    status,
    resetError,
  } = useChangePassword();

  const formik = useForm({
    initialValues: {
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: ChangePasswordSchema,
    mutate,
  });

  useEffect(() => {
    if (status === 'success') {
      formik.resetForm();
      resetError();
    }
  }, [status]);

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Zmień hasło</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="passwordCurrent"
          placeholder="Stare hasło"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordCurrent}
          error={formik.isValid ? error : formik.errors.passwordCurrent}
        />
        <Input
          name="password"
          placeholder="Nowe hasło"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Input
          name="passwordConfirm"
          placeholder="Powtórz nowe hasło"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          error={formik.errors.passwordConfirm}
        />
        <Button
          size="big"
          isDisabled={isLoading}
          buttonStyleType="primary"
          text="Zmień hasło"
          type="submit"
          style={{ margin: '0 auto' }}
        />
      </form>
    </div>
  );
};
