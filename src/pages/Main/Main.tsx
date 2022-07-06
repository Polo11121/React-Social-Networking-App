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
      <main className="main__content">
        <div>
          <div>test</div>
          <LoginForm />
        </div>
        <button onClick={toggleIsRegisterModalOpen} type="button">
          Utwórz nowe konto
        </button>
      </main>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onCloseModal={toggleIsRegisterModalOpen}
      />
    </div>
  );
};
