/* eslint-disable jsx-a11y/alt-text */
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type ImageCarouselPropsType = {
  images: string[];
  selectedPhoto?: number;
  onClick?: (index: number, item: React.ReactNode) => void;
};

export const ImageCarousel = ({
  images,
  selectedPhoto = 0,
  onClick,
}: ImageCarouselPropsType) => (
  <Carousel
    onClickItem={onClick}
    selectedItem={selectedPhoto}
    showThumbs={false}
    statusFormatter={(current, total) => `${current} z ${total}`}
  >
    {images.map((image) => (
      <img src={image} />
    ))}
  </Carousel>
);
