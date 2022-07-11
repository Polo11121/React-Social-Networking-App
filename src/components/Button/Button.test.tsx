import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from 'components';

describe('<Button>', () => {
  it('should display button "Test" inside', () => {
    render(
      <Router>
        <Button buttonStyleType="primary" text="Test" />
      </Router>
    );

    screen.getByText('Test');
  });

  it('should listen for a click event', () => {
    const spy = jest.fn();
    render(
      <Router>
        <Button buttonStyleType="primary" text="Test" onClick={spy} />
      </Router>
    );

    const button = screen.getByText('Test');
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(1);
  });

  it('should not listen for a click event if button is disabled', () => {
    const spy = jest.fn();
    render(
      <Router>
        <Button
          buttonStyleType="primary"
          text="Test"
          onClick={spy}
          isDisabled
        />
      </Router>
    );

    const button = screen.getByText('Test');
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(0);
  });
});
