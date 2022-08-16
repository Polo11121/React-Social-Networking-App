import { Story, Meta } from '@storybook/react';
import { Photos } from 'components';
import { PhotosPropsType } from 'components/Photos/Photos';

export default {
  component: Photos,
  title: 'Photos',
} as Meta;

const Template: Story<PhotosPropsType> = (args) => <Photos {...args} />;

export const Default = Template.bind({});
Default.args = {
  photosList: [
    {
      image:
        'https://zooart.com.pl/blog/wp-content/uploads/2020/10/kot-bengalski-6.jpeg',
      label: 'kot',
      type: 'test',
    },
  ],
  title: 'test',
  maxHeight: 305,
  rowHeight: 105,
  colsNum: 2,
};
