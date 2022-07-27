import { Story, Meta } from '@storybook/react';
import { EditHeaderPropsType } from 'components/EditHeader/EditHeader';
import { EditHeader } from 'components';

export default {
  component: EditHeader,
  title: 'EditHeader',
} as Meta;

const Template: Story<EditHeaderPropsType> = (args) => (
  <EditHeader {...args} onClose={() => {}} onSubmit={() => {}} />
);

export const Default = Template.bind({});
Default.args = { text: 'Test' };

export const Disabled = Template.bind({});
Disabled.args = { text: 'Disabled', isDisabled: true };
