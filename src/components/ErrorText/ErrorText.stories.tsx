import { Story, Meta } from '@storybook/react';
import { ErrorText } from 'components';
import { ErrorTextType } from 'components/ErrorText/ErrorText';

export default {
  component: ErrorText,
  title: 'ErrorText',
} as Meta;

const Template: Story<ErrorTextType> = (args) => <ErrorText {...args} />;

export const Default = Template.bind({});
Default.args = { text: 'Test Error' };
