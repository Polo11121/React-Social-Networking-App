/* eslint-disable jsx-a11y/alt-text */
import { CSSProperties } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type ImageCarouselPropsType = {
  images: string[];
  selectedPhoto?: number;
  onClick?: (index: number, item: React.ReactNode) => void;
  imageStyle?: CSSProperties;
};

export const ImageCarousel = ({
  images,
  onClick,
  imageStyle,
  selectedPhoto = 0,
}: ImageCarouselPropsType) => (
  <Carousel
    onClickItem={onClick}
    selectedItem={selectedPhoto}
    showThumbs={false}
    statusFormatter={(current, total) => `${current} z ${total}`}
  >
    {images.map((image) => (
      <img
        src={image}
        key={image}
        style={{
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          ...imageStyle,
        }}
      />
    ))}
  </Carousel>
);
