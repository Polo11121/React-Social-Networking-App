import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from 'components';

describe('<Search>', () => {
  it('should Search assign value', () => {
    render(<Search value="Test" onChange={() => {}} />);

    screen.getByDisplayValue('Test');
  });

  it('should Input have placeholder', () => {
    render(<Search value="" placeholder="Test" onChange={() => {}} />);

    screen.getByPlaceholderText('Test');
  });

  it('should Input listen for a change event', () => {
    const spy = jest.fn();
    render(<Search value="text" onChange={spy} />);

    const input = screen.getByDisplayValue('text');
    fireEvent.change(input, { target: { value: 'text1' } });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should Search not have loupe icon', () => {
    render(<Search value="Test" onChange={() => {}} hideIcon testId="test" />);

    const loupeIcon = screen.queryByTestId('loupe-icon-test');

    expect(loupeIcon).not.toBeInTheDocument();
  });
});
