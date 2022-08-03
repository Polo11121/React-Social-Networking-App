import { render, screen } from '@testing-library/react';
import { Spinner } from 'components';

describe('<Spinner>', () => {
  it('should display Spinner', () => {
    render(<Spinner testId="test-" />);

    screen.getByTestId('test-spinner');
  });
});
