import { Story, Meta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ButtonPropsType } from 'components/Button/Button';
import { Button } from 'components';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonPropsType> = (args) => {
  return (
    <Router>
      <Button {...args} />
    </Router>
  );
};

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
