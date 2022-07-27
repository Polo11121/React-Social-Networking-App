import { Story, Meta } from '@storybook/react';
import { ButtonPropsType } from 'components/Button/Button';
import { Button } from 'components';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonPropsType> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { text: 'Primary', buttonStyleType: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { text: 'Secondary', buttonStyleType: 'secondary' };

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled',
  buttonStyleType: 'primary',
  isDisabled: true,
};
