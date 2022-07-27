import { render, screen } from '@testing-library/react';
import { SectionCard } from 'components';

describe('<SectionCard>', () => {
  it('should display SectionCard', () => {
    render(
      <SectionCard>
        <h1>test</h1>
      </SectionCard>
    );

    screen.getByText('test');
  });

  it('should display SectionCard with title "TestTitle"', () => {
    render(
      <SectionCard sectionTitle="TestTitle">
        <h1>test</h1>
      </SectionCard>
    );

    screen.getByText('TestTitle');
  });
});
