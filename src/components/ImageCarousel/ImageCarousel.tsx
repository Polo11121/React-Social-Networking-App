/* eslint-disable jsx-a11y/alt-text */
import { CSSProperties } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.scss';

type ImageCarouselPropsType = {
  images: { image: string; label?: string }[] | string[];
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
    showIndicators={false}
    onClickItem={onClick}
    selectedItem={selectedPhoto}
    showThumbs={false}
    statusFormatter={(current, total) => `${current} z ${total}`}
  >
    {images.map((image) => (
      <div
        className="image-carousel__item"
        key={typeof image === 'string' ? image : image.image}
      >
        <img
          src={typeof image === 'string' ? image : image.image}
          key={typeof image === 'string' ? image : image.image}
          style={{
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            ...imageStyle,
          }}
        />
        {typeof image !== 'string' && (
          <p className="image-carousel__item-label">{image.label}</p>
        )}
      </div>
    ))}
  </Carousel>
);
