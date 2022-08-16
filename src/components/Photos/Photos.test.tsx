import { fireEvent, render, screen } from '@testing-library/react';
import { Photos } from 'components';

describe('<Photos>', () => {
  it('should render Photos with "test" title', () => {
    render(
      <Photos
        photosList={[
          {
            image:
              'https://zooart.com.pl/blog/wp-content/uploads/2020/10/kot-bengalski-6.jpeg',
            label: 'kot',
            type: 'test',
          },
        ]}
        title="test"
        maxHeight={305}
        rowHeight={105}
        colsNum={2}
      />
    );

    screen.getByText('test');
  });

  it('should render one photo', () => {
    render(
      <Photos
        photosList={[
          {
            image:
              'https://zooart.com.pl/blog/wp-content/uploads/2020/10/kot-bengalski-6.jpeg',
            label: 'kot',
            type: 'test',
          },
        ]}
        title="test"
        maxHeight={305}
        rowHeight={105}
        colsNum={2}
      />
    );

    screen.getByRole('img');
  });

  it('should open modal after clicking photo', () => {
    render(
      <Photos
        photosList={[
          {
            image:
              'https://zooart.com.pl/blog/wp-content/uploads/2020/10/kot-bengalski-6.jpeg',
            label: 'kot',
            type: 'test',
          },
        ]}
        title="test"
        maxHeight={305}
        rowHeight={105}
        colsNum={2}
      />
    );

    const photo = screen.getByRole('img');
    fireEvent.click(photo);

    screen.getByText('kot');
  });
});
