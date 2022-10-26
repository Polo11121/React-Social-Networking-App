import { Story, Meta } from '@storybook/react';
import { ImagePicker } from 'components';
import { ImagePickerPropsType } from 'components/ImagePicker/ImagePicker';

export default {
  component: ImagePicker,
  title: 'ImagePicker',
} as Meta;

const Template: Story<ImagePickerPropsType> = (args) => (
  <ImagePicker {...args} onChooseFile={(file: File | FileList | null) => {}} />
);

export const Default = Template.bind({});
Default.args = { text: 'Dodaj zdjęcie' };

export const Circle = Template.bind({});
Circle.args = { tooltipText: 'Dodaj zdjęcie' };
