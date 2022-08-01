import { Story, Meta } from '@storybook/react';
import { ImagePicker } from 'components';
import { ImagePickerPropsType } from './ImagePicker';

export default {
  component: ImagePicker,
  title: 'ImagePicker',
} as Meta;

const Template: Story<ImagePickerPropsType> = (args) => (
  <ImagePicker {...args} handleFile={(file: File | FileList | null) => {}} />
);

export const Default = Template.bind({});
Default.args = { text: 'Dodaj zdjęcie' };

export const Circle = Template.bind({});
Circle.args = { tooltipText: 'Dodaj zdjęcie' };
