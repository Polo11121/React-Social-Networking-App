import { Button, Input } from 'components';
import { LoginFormHeader } from 'shared/features/LoginFormHeader/LoginFormHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'shared/hooks/useForm';
import { useResetPassword } from 'api/useResetPassword';
import { ResetPasswordSchema } from 'pages/ResetPassword/ResetPasswordSchema';
import { customToast } from 'shared/hooks/customToast';
import './ResetPassword.scss';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const navigateToMainPageHandler = () => navigate('/');

  const onSuccess = () => {
    navigateToMainPageHandler();
    customToast({
      text: 'Pomyślnie zresetowano hasło, można ponownie się zalogować',
    });
  };
  const { mutate, error, isLoading } = useResetPassword(onSuccess, token);

  const formik = useForm({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validationSchema: ResetPasswordSchema,
    mutate,
  });

  return (
    <div className="reset-password">
      <LoginFormHeader />
      <div className="reset-password__container">
        <main className="reset-password__content">
          <h1 className="reset-password__title">Zmień hasło</h1>
          <form className="reset-password__form" onSubmit={formik.handleSubmit}>
            <div className="reset-password__form-content">
              <Input
                placeholder="Nowe hasło"
                name="password"
                error={formik.errors.password}
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Input
                style={{ marginBottom: 0 }}
                placeholder="Powtórz nowe hasło"
                name="passwordConfirm"
                error={formik.isValid ? error : formik.errors.passwordConfirm}
                type="password"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
              />
            </div>
            <div className="reset-password__buttons">
              <div style={{ padding: '1rem', display: 'flex' }}>
                <Button
                  size="big"
                  buttonStyleType="mandy"
                  text="Anuluj"
                  onClick={navigateToMainPageHandler}
                  style={{ marginLeft: '1rem' }}
                />
                <Button
                  isLoading={isLoading}
                  size="big"
                  buttonStyleType="primary"
                  text="Zmień hasło"
                  type="submit"
                  style={{ marginLeft: '1rem' }}
                />
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
