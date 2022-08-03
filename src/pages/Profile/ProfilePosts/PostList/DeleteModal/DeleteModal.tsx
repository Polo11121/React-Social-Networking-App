import { IconButton, Modal } from '@mui/material';
import { Button } from 'components';
import { useDeletePost } from 'api/useDeletePost';
import ClearIcon from '@mui/icons-material/Clear';
import './DeleteModal.scss';

export const DeleteModal = ({
  deletedPost,
  onClose,
}: {
  deletedPost: null | string;
  onClose: () => void;
}) => {
  const { mutate, isLoading } = useDeletePost({
    postId: deletedPost as string,
    afterUpdate: onClose,
  });

  const handleDeletePost = () => mutate({});

  return (
    <Modal
      open={Boolean(deletedPost)}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      onClose={onClose}
    >
      <div className="delete-modal">
        <IconButton className="delete-modal__exit-button" onClick={onClose}>
          <ClearIcon />
        </IconButton>
        <div className="delete-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Usunąć post ?</h1>
          </div>
        </div>
        <div className="delete-modal__content">
          <p>
            Usunięcie posta jest nieodwracalne i nie można cofnąć tego procesu.
          </p>
          <div className="delete-modal__buttons">
            <Button onClick={onClose} buttonStyleType="primary" text="Anuluj" />
            <Button
              onClick={handleDeletePost}
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
