/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { SectionCard } from 'components';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { PhotosModal } from 'shared/fixtures/PhotosModal/PhotosModal';
import { ImageList, ImageListItem } from '@mui/material';

export const ProfilePhotos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | number>(null);
  const { user, userPhotos } = useProfileInfo();

  const onModalClose = () => setSelectedPhoto(null);

  return (
    <>
      <SectionCard sectionTitle="Zdjęcia">
        <ImageList sx={{ maxHeight: 328 }} cols={3} rowHeight={164}>
          {userPhotos.map((photo, index) => (
            <ImageListItem key={photo}>
              <img
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPhoto(index)}
                src={`${photo}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={`${user.name}-${user.surname}-img`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </SectionCard>
      <PhotosModal
        onClose={onModalClose}
        selectedPhoto={selectedPhoto}
        photos={userPhotos}
      />
    </>
  );
};
