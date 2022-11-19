import { useForgotPassword } from 'api/useForgotPassword';
import { LoginFormHeader } from 'shared/features/LoginFormHeader/LoginFormHeader';
import { ForgotPasswordSchema } from 'pages/ForgotPassword/ForgotPasswordSchema';
import { Button, Input } from 'components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'shared/hooks/useForm';
import './ForgotPassword.scss';

export const ForgotPassword = () => {
  const { mutate, error, isLoading } = useForgotPassword();
  const navigate = useNavigate();

  const formik = useForm({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    mutate,
  });

  const navigateToMainPageHandler = () => navigate('/');

  return (
    <div className="forgot-password">
      <LoginFormHeader />
      <div className="forgot-password__container">
        <main className="forgot-password__content">
          <h1 className="forgot-password__title">Znajdź swoje konto</h1>
          <form
            className="forgot-password__form"
            onSubmit={formik.handleSubmit}
          >
            <p className="forgot-password__text">
              Wprowadź adres e-mail, aby wyszukać swoje konto.
            </p>
            <Input
              style={{ margin: '0 1rem ' }}
              placeholder="Adres e-mail"
              name="email"
              error={formik.isValid ? error : formik.errors.email}
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="forgot-password__buttons">
              <div style={{ padding: '1rem', display: 'flex' }}>
                <Button
                  size="big"
                  buttonStyleType="mandy"
                  text="Anuluj"
                  onClick={navigateToMainPageHandler}
                  style={{ marginLeft: '1rem' }}
                />
                <Button
                  size="big"
                  buttonStyleType="primary"
                  text="Szukaj"
                  isDisabled={isLoading}
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
