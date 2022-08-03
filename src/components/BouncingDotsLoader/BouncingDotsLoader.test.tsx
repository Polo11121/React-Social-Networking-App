import { render, screen } from '@testing-library/react';
import { BouncingDotsLoader } from 'components';

describe('<BouncingDotsLoader>', () => {
  it('should render BouncingDotsLoader', () => {
    render(<BouncingDotsLoader testId="test-" />);

    screen.getByTestId('test-loader');
  });
});
