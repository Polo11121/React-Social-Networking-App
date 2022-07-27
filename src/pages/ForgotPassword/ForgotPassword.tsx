import { useForgotPassword } from 'api/useForgotPassword';
import { ForgotPasswordSchema } from 'pages/ForgotPassword/ForgotPasswordSchema';
import { Button, Header, Input } from 'components';
import { LoginForm } from 'shared/fixtures/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'shared/hooks/useForm';
import './ForgotPassword.scss';

export const ForgotPassword = () => {
  const { mutate, error, isLoading } = useForgotPassword();
  const navigate = useNavigate();

  const formik = useForm({
    initialValues: {
      emailAddress: '',
    },
    validationSchema: ForgotPasswordSchema,
    mutate,
  });

  const switchToMainPage = () => navigate('/');

  return (
    <div className="forgot-password">
      <Header>
        <div className="forgot-password__login-form">
          <LoginForm isInverse />
        </div>
        <div className="forgot-password__login-button">
          <Button
            size="big"
            buttonStyleType="primary"
            text="Zaloguj"
            onClick={switchToMainPage}
          />
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
              <div style={{ padding: '1rem', display: 'flex' }}>
                <Button
                  size="big"
                  buttonStyleType="mandy"
                  text="Anuluj"
                  onClick={switchToMainPage}
                  style={{ marginLeft: '1rem' }}
                />
                <Button
                  onClick={() => {}}
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
