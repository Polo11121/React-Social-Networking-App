import { ImageCarousel } from 'components';
import { Modal } from '@mui/material';
import './PhotosModal.scss';

type PhotosModalType = {
  selectedPhoto: null | number;
  onClose?: () => void;
  photos: string[];
};

export const PhotosModal = ({
  selectedPhoto,
  onClose,
  photos,
}: PhotosModalType) => (
  <Modal
    style={{
      display: 'grid',
      placeItems: 'center',
    }}
    open={selectedPhoto !== null}
    onClose={onClose}
  >
    <div className="photo-modal">
      <ImageCarousel
        imageStyle={{
          maxHeight: '60vh',
        }}
        selectedPhoto={selectedPhoto as number}
        images={photos}
      />
    </div>
  </Modal>
);
