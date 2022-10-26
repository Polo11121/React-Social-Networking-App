/* eslint-disable testing-library/prefer-screen-queries,jsx-a11y/label-has-associated-control */
import { render } from '@testing-library/react';
import { Select } from 'components';
import selectEvent from 'react-select-event';

const options = [{ label: 'Test', value: 'Test' }];

describe('<Select>', () => {
  it('should Select have empty value', () => {
    const { getByTestId } = render(
      <form data-testid="form">
        <Select
          name="select"
          inputId="select"
          options={[]}
          onChange={() => {}}
        />
      </form>
    );

    expect(getByTestId('form')).toHaveFormValues({ select: '' });
  });

  it('should Input assign value', () => {
    const { getByTestId } = render(
      <form data-testid="form">
        <Select
          name="select"
          inputId="select"
          placeholder="Test"
          options={options}
          value={{ label: 'Test', value: 'Test' }}
          onChange={() => {}}
        />
      </form>
    );

    expect(getByTestId('form')).toHaveFormValues({ select: 'Test' });
  });

  it('should Select listen for a change event', async () => {
    const { getByTestId, getByLabelText } = render(
      <form data-testid="form">
        <label htmlFor="select">Test</label>
        <Select
          name="select"
          inputId="select"
          placeholder="Test"
          options={options}
          onChange={() => {}}
        />
      </form>
    );

    expect(getByTestId('form')).toHaveFormValues({ select: '' });

    await selectEvent.select(getByLabelText('Test'), ['Test']);

    expect(getByTestId('form')).toHaveFormValues({
      select: 'Test',
    });
  });
});
