import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from 'components';

describe('<Header>', () => {
  it('should display header with "DATE-APP" logo', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    screen.getByText('DATE-APP');
  });
});
