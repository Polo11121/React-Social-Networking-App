import { render } from '@testing-library/react';
import { Spinner } from 'components';

describe('<SectionCard>', () => {
  it('should display Spinner', () => {
    render(<Spinner />);
  });
});
