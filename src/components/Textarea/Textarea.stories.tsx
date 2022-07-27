import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { TextareaPropsType } from 'components/Textarea/Textarea';
import { Textarea } from 'components';

export default {
  component: Textarea,
  title: 'Textarea',
} as Meta;

const Template: Story<TextareaPropsType> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value)
      }
    />
  );
};

export const Default = Template.bind({});
Default.args = { value: 'Test', name: 'Default', placeholder: 'Default Input' };
