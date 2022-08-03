import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from 'components';

describe('<Button>', () => {
  it('should display Button with "Test" inside', () => {
    render(<Button buttonStyleType="primary" text="Test" />);

    screen.getByText('Test');
  });

  it('should Button listen for a click event', () => {
    const spy = jest.fn();
    render(<Button buttonStyleType="primary" text="Test" onClick={spy} />);

    const button = screen.getByText('Test');
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(1);
  });

  it('should Button not listen for a click event if is disabled', () => {
    const spy = jest.fn();
    render(
      <Button buttonStyleType="primary" text="Test" onClick={spy} isDisabled />
    );

    const button = screen.getByText('Test');
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(0);
  });
});
