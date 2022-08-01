import { ImageCarousel } from 'components';
import { Modal } from '@mui/material';

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
    <div style={{ width: '300px', height: '600px' }}>
      <ImageCarousel selectedPhoto={selectedPhoto as number} images={photos} />
    </div>
  </Modal>
);
