import { render, screen } from '@testing-library/react';
import { ImagePicker } from 'components';

describe('<ImagePicker>', () => {
  it('should display ImagePicker with "Choose file" text', () => {
    const spy = jest.fn();
    render(<ImagePicker onChooseFile={spy} text="Choose file" />);

    screen.getByText('Choose file');
  });
});
