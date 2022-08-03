import { fireEvent, render, screen } from '@testing-library/react';
import { Textarea } from 'components';

describe('<Textarea>', () => {
  it('should Textarea assign value', () => {
    render(<Textarea value="Test" onChange={() => {}} />);

    screen.getByDisplayValue('Test');
  });

  it('should Textarea have placeholder', () => {
    render(<Textarea value="" placeholder="Test" onChange={() => {}} />);

    screen.getByPlaceholderText('Test');
  });

  it('should Textarea listen for a change event', () => {
    const spy = jest.fn();
    render(<Textarea value="text" onChange={spy} />);

    const input = screen.getByDisplayValue('text');
    fireEvent.change(input, { target: { value: 'text1' } });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
