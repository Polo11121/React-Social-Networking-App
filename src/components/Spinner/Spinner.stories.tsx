import { Story, Meta } from '@storybook/react';
import { Spinner } from 'components';

export default {
  component: Spinner,
  title: 'Spinner',
} as Meta;

const Template: Story = () => <Spinner />;

export const Default = Template.bind({});
