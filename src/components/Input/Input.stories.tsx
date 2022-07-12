import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { InputPropsType } from 'components/Input/Input';
import { Input } from 'components';

export default {
  component: Input,
  title: 'Input',
} as Meta;

const Template: Story<InputPropsType> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <Input
      {...args}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = { value: 'Test', name: 'Default', placeholder: 'Default Input' };

export const Error = Template.bind({});
Error.args = {
  value: 'Test',
  name: 'Error',
  placeholder: 'Error Input',
  error: 'Error Input',
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Test',
  name: 'Disabled',
  placeholder: 'Disabled Input',
  isDisabled: true,
};
