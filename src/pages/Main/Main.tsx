import { useState } from 'react';
import { RegisterModal } from 'pages/Main/RegisterModal/RegisterModal';
import { LoginForm } from 'components';
import './Main.scss';

export const Main = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleIsRegisterModalOpen = () =>
    setIsRegisterModalOpen((prevState) => !prevState);

  return (
    <div className="main">
      <div className="main__container">
        <main className="main__content">
          <div>test</div>
          <div>
            <LoginForm />
            <button onClick={toggleIsRegisterModalOpen} type="button">
              Utwórz nowe konto
            </button>
          </div>
        </main>
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onCloseModal={toggleIsRegisterModalOpen}
        />
      </div>
    </div>
  );
};
