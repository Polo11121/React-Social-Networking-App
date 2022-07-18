import { fireEvent, render, screen } from '@testing-library/react';
import { Tooltip } from 'components';

describe('<Tooltip>', () => {
  it('should not show tooltip', () => {
    render(
      <>
        <p data-tip data-for="tooltip" style={{ width: 'fit-content' }}>
          hover here
        </p>
        <Tooltip id="tooltip" text="tooltip" />
      </>
    );

    expect(screen.queryByText('tooltip')).not.toBeVisible();
  });

  it('should show tooltip after hover', () => {
    render(
      <>
        <p data-tip data-for="tooltip" style={{ width: 'fit-content' }}>
          hover here
        </p>
        <Tooltip id="tooltip" text="tooltip" />
      </>
    );

    fireEvent.mouseEnter(screen.getByText('hover here'));

    expect(screen.queryByText('tooltip')).toBeVisible();
  });
});
