import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from 'components';

describe('<Input>', () => {
  it('should Input assign value', () => {
    render(<Input value="Test" onChange={() => {}} />);

    screen.getByDisplayValue('Test');
  });

  it('should Input have placeholder', () => {
    render(<Input value="" placeholder="Test" onChange={() => {}} />);

    screen.getByPlaceholderText('Test');
  });

  it('should Input listen for a change event', () => {
    const spy = jest.fn();

    render(<Input value="text" onChange={spy} />);

    const input = screen.getByDisplayValue('text');
    fireEvent.change(input, { target: { value: 'text1' } });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
