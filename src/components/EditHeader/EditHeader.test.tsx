import { fireEvent, render, screen } from '@testing-library/react';
import { EditHeader } from 'components';

describe('<EditHeader>', () => {
  it('should display EditHeader with "Test" inside', () => {
    const spy = jest.fn();
    render(<EditHeader text="Test" onClose={spy} onSubmit={spy} />);

    screen.getByText('Test');
  });

  it('should close button listen for a click event', () => {
    const spy = jest.fn();
    render(<EditHeader text="Test" onClose={spy} onSubmit={spy} />);

    const button = screen.getByText('Anuluj');
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(1);
  });

  it('should submit button listen for a click event', () => {
    const spy = jest.fn();
    render(<EditHeader text="Test" onClose={spy} onSubmit={spy} />);

    const button = screen.getByText('Zapisz');
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(1);
  });

  it('should submit button be disabled', () => {
    const spy = jest.fn();
    render(<EditHeader text="Test" onClose={spy} onSubmit={spy} isDisabled />);

    expect(screen.getByText('Zapisz')).toBeDisabled();
  });
});
