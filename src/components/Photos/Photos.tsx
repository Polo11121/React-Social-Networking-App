/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { SectionCard } from 'components';
import { PhotosModal } from 'shared/fixtures/PhotosModal/PhotosModal';
import { ImageList, ImageListItem } from '@mui/material';

export type PhotosPropsType = {
  photosList: {
    image: string;
    label: string;
    type: string;
  }[];
  title?: string;
  maxHeight: number;
  rowHeight: number;
  colsNum: number;
};

export const Photos = ({
  photosList,
  title,
  maxHeight,
  rowHeight,
  colsNum,
}: PhotosPropsType) => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | number>(null);

  const closeModalHandler = () => setSelectedPhoto(null);

  return (
    <>
      <SectionCard sectionTitle={title}>
        <ImageList
          sx={{ maxHeight }}
          cols={colsNum}
          rowHeight={rowHeight}
          variant="quilted"
        >
          {photosList.map((photo, index) => (
            <ImageListItem key={photo.image}>
              <img
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPhoto(index)}
                src={`${photo.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${photo.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={photo.image}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </SectionCard>
      {selectedPhoto !== null && (
        <PhotosModal
          onClose={closeModalHandler}
          selectedPhoto={selectedPhoto}
          photos={photosList}
        />
      )}
    </>
  );
};
