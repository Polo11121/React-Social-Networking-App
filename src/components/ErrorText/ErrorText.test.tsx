import { render, screen } from '@testing-library/react';
import { ErrorText } from 'components';

describe('<ErrorText>', () => {
  it('should display ErrorText with text "Test Error"', () => {
    render(<ErrorText text="Test Error" />);

    expect(screen.getByText('Test Error')).toHaveStyle('color: red');
  });

  it('should not display ErrorText', () => {
    render(<ErrorText isHidden text="Test Error" />);

    expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
  });
});
