import { LoginForm } from 'shared/fixtures/LoginForm/LoginForm';
import { Header, Button } from 'components';
import { useNavigate } from 'react-router-dom';
import './LoginFormHeader.scss';

export const LoginFormHeader = () => {
  const navigate = useNavigate();

  const navigateToMainPage = () => navigate('/');

  return (
    <Header>
      <div className="login-form-header__login-form">
        <LoginForm isInverse />
      </div>
      <div className="login-form-header__login-button">
        <Button
          size="big"
          buttonStyleType="primary"
          text="Zaloguj"
          onClick={navigateToMainPage}
        />
      </div>
    </Header>
  );
};
