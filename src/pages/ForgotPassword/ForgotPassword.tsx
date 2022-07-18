import { useForgotPassword } from 'api/useForgotPassword';
import { ForgotPasswordSchema } from 'pages/ForgotPassword/ForgotPasswordSchema';
import { Button, Header, Input } from 'components';
import { LoginForm } from 'shared/forms/LoginForm/LoginForm';
import { useForm } from 'shared/hooks/useForm';
import './ForgotPassword.scss';

export const ForgotPassword = () => {
  const { mutate, error, isLoading } = useForgotPassword();

  const formik = useForm({
    initialValues: {
      emailAddress: '',
    },
    validationSchema: ForgotPasswordSchema,
    mutate,
  });

  return (
    <div className="forgot-password">
      <Header>
        <div className="forgot-password__login-form">
          <LoginForm isInverse />
        </div>
        <div className="forgot-password__login-button">
          <Button buttonStyleType="primary" text="Zaloguj" to="/" />
        </div>
      </Header>
      <div className="forgot-password__container">
        <main className="forgot-password__content">
          <h1 className="forgot-password__title">Znajdź swoje konto</h1>
          <form
            className="forgot-password__form"
            onSubmit={formik.handleSubmit}
          >
            <p className="forgot-password__text">
              Wprowadź adres e-mail lub numer telefonu komórkowego, aby wyszukać
              swoje konto.
            </p>
            <Input
              style={{ margin: '0 1rem ' }}
              placeholder="Adres e-mail"
              name="emailAddress"
              error={formik.isValid ? error : formik.errors.emailAddress}
              type="text"
              onChange={formik.handleChange}
              value={formik.values.emailAddress}
            />
            <div className="forgot-password__buttons">
              <div style={{ padding: '1rem' }}>
                <Button
                  buttonStyleType="secondary"
                  text="Anuluj"
                  to="/"
                  style={{ marginLeft: '1rem' }}
                />
                <Button
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
