import { Story, Meta } from '@storybook/react';
import { ImageCarousel } from 'components';

export default {
  component: ImageCarousel,
  title: 'ImageCarousel',
} as Meta;

const Template: Story<{ images: string[] }> = (args) => (
  <ImageCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  images: [
    'https://www.w3schools.com/css/img_lights.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
  ],
};
