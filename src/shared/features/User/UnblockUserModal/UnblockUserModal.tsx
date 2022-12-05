import { IconButton, Modal } from '@mui/material';
import { Button } from 'components';
import { useUnblockUser } from 'api/useUnblockUser';
import { customToast } from 'shared/hooks/customToast';
import { useQueryClient } from 'react-query';
import ClearIcon from '@mui/icons-material/Clear';
import './UnblockUserModal.scss';

type UnblockUserModalPropsType = {
  isOpen: boolean;
  userId: string;
  userFullName: string;
  onClose: () => void;
};

export const UnblockUserModal = ({
  userId,
  userFullName,
  isOpen,
  onClose,
}: UnblockUserModalPropsType) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    customToast({ text: 'Pomyślnie odblokowano użytkownika' });
    queryClient.invalidateQueries('users');
    onClose();
  };

  const { mutate, isLoading } = useUnblockUser(userId, onSuccess);

  const unblockUserHandler = () => mutate({});

  return (
    <Modal
      open={isOpen}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      onClose={onClose}
    >
      <div className="unblock-user-modal" data-testid="unblock-user-modal">
        <IconButton
          className="unblock-user-modal__exit-button"
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
        <div className="unblock-user-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Odblokuj użytkownika</h1>
          </div>
        </div>
        <div className="unblock-user-modal__content">
          <p>Na pewno chcesz odblokować użytkownika {userFullName}?</p>
          <div className="unblock-user-modal__buttons">
            <Button
              onClick={onClose}
              buttonStyleType="primary"
              text="Anuluj"
              testId="cancel-unblock-user-button"
            />
            <Button
              onClick={unblockUserHandler}
              isLoading={isLoading}
              buttonStyleType="mandy"
              text="Odblokuj"
              testId="submit-unblock-user-button"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
