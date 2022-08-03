import { render, screen } from '@testing-library/react';
import { ImageCarousel } from 'components';

describe('<BouncingDotsLoader>', () => {
  it('should render BouncingDotsLoader', () => {
    render(
      <ImageCarousel
        images={[
          'https://www.w3schools.com/css/img_lights.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        ]}
      />
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });
});
