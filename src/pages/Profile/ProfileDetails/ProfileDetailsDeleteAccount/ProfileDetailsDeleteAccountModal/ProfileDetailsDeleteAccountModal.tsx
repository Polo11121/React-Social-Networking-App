import { useDeleteUser } from 'api/useDeleteUser';
import { IconButton, Modal } from '@mui/material';
import { Button } from 'components';
import ClearIcon from '@mui/icons-material/Clear';
import './ProfileDetailsDeleteAccountModal.scss';

export const ProfileDetailsDeleteAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { mutate, isLoading } = useDeleteUser();

  const deleteAccountHandler = () => mutate({});

  return (
    <Modal
      open={isOpen}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      onClose={onClose}
    >
      <div
        className="profile-details-delete-account-modal"
        data-testid="delete-account-modal"
      >
        <IconButton
          className="profile-details-delete-account-modal__exit-button"
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
        <div className="profile-details-delete-account-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Usuń konto</h1>
          </div>
        </div>
        <div className="profile-details-delete-account-modal__content">
          <p>
            Usunięcie konta jest nieodwracalne i nie można cofnąć tego procesu.
          </p>
          <div className="profile-details-delete-account-modal__buttons">
            <Button
              onClick={onClose}
              buttonStyleType="primary"
              text="Anuluj"
              testId="delete-account-modal-cancel-button"
            />
            <Button
              onClick={deleteAccountHandler}
              isDisabled={isLoading}
              buttonStyleType="mandy"
              text="Usuń"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
