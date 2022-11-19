import { IconButton, Modal } from '@mui/material';
import { Button } from 'components';
import ClearIcon from '@mui/icons-material/Clear';
import './RejectMatchModal.scss';

type RejectMatchModalPropsType = {
  rejectMatch: () => Promise<void>;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
};

export const RejectMatchModal = ({
  rejectMatch,
  isOpen,
  isLoading,
  onClose,
}: RejectMatchModalPropsType) => {
  const rejectMatchHandler = () => rejectMatch().then(onClose);

  return (
    <Modal
      open={isOpen}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      onClose={onClose}
    >
      <div className="reject-match-modal" data-testid="reject-match-modal">
        <IconButton
          className="reject-match-modal__exit-button"
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
        <div className="reject-match-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Anuluj dopasowanie</h1>
          </div>
        </div>
        <div className="reject-match-modal__content">
          <p>Na pewno chcesz anulować dopasowanie?</p>
          <div className="reject-match-modal__buttons">
            <Button
              onClick={onClose}
              buttonStyleType="primary"
              text="Powrót"
              testId="cancel-reject-match-button"
            />
            <Button
              onClick={rejectMatchHandler}
              buttonStyleType="mandy"
              isDisabled={isLoading}
              text="Anuluj"
              testId="submit-reject-match-button"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
