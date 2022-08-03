import { Meta } from '@storybook/react';
import { BouncingDotsLoader } from 'components';

export default {
  component: BouncingDotsLoader,
  title: 'BouncingDotsLoader',
} as Meta;

const Template = () => <BouncingDotsLoader />;

export const Default = Template.bind({});
