import { ImageCarousel } from 'components';
import { Modal } from '@mui/material';
import './PhotosModal.scss';

type PhotosModalPropsType = {
  selectedPhoto: null | number;
  onClose?: () => void;
  photos: { image: string; label?: string }[];
};

export const PhotosModal = ({
  selectedPhoto,
  onClose,
  photos,
}: PhotosModalPropsType) => (
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
