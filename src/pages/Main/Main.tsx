import { useState } from 'react';
import { RegisterModal } from 'pages/Main/RegisterModal/RegisterModal';
import { LoginForm } from 'shared/features/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import { Button } from 'components';
import './Main.scss';

export const Main = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const registerModalVisibilityHandler = () =>
    setIsRegisterModalOpen((prevState) => !prevState);

  return (
    <div className="main">
      <div className="main__container">
        <main className="main__content">
          <div className="main__text">
            <h1 className="main__title">DATE-APP</h1>
            <h3 className="main__description">
              Date-App pomaga kontaktować się z innymi osobami oraz udostępniać
              im różne informacje i materiały.
            </h3>
          </div>
          <div className="main__form">
            <LoginForm>
              <Link className="main__link" to="/forgot-password">
                Nie pamietasz hasła ?
              </Link>
              <div className="main__form-line" />
              <Button
                onClick={registerModalVisibilityHandler}
                buttonStyleType="secondary"
                text="Utwórz nowe konto"
                style={{ fontSize: '1.063rem', margin: '0.5rem auto' }}
                size="big"
              />
            </LoginForm>
          </div>
        </main>
        {isRegisterModalOpen && (
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={registerModalVisibilityHandler}
          />
        )}
      </div>
    </div>
  );
};
