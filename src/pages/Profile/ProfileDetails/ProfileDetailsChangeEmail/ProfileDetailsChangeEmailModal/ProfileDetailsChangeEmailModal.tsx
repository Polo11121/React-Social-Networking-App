import { Modal } from '@mui/material';
import { Button } from 'components';
import { useLogout } from 'api/useLogout';
import './ProfileDetailsChangeEmailModal.scss';

export const ProfileDetailsChangeEmailModal = ({
  isOpen,
}: {
  isOpen: boolean;
}) => {
  const { mutate, isLoading } = useLogout();

  const logoutHandler = () => mutate();

  return (
    <Modal
      open={isOpen}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        className="profile-details-change-email-modal__container"
        data-testid="change-email-modal"
      >
        <div className="profile-details-change-email-modal">
          <div className="profile-details-change-email-modal__text">
            <div style={{ padding: '1rem' }}>
              <h1>Ważna informacja</h1>
            </div>
          </div>
          <div className="profile-details-change-email-modal__content">
            <div>
              Na nowy adres e-mail zostało wysłane potwierdzenie zmiany. Dopiero{' '}
              <span className="profile-details-change-email-modal__text--bold">
                po kliknięciu w link wysłany w mailu
              </span>
              , będzie można uzywać nowego adresu e-mail.
            </div>
            <div>
              Jeżeli potwierdzenie nie nastąpi, logowanie będzie możliwe za
              pomocą starego adresu e-mail.
            </div>
          </div>
          <div className="profile-details-change-email-modal__button">
            <Button
              isLoading={isLoading}
              onClick={logoutHandler}
              size="big"
              text="Wyloguj"
              buttonStyleType="primary"
              testId="change-email-logout-button"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
