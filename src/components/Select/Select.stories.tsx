import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { CustomSelectPropsType } from 'components/Select/Select';
import { Select } from 'components';
import { SingleValue } from 'react-select';
import { SelectOptionType } from 'shared/types/repeatableTypes';

export default {
  component: Select,
  title: 'Select',
} as Meta;

const Template: Story<CustomSelectPropsType> = (args) => {
  const [selectValue, setSelectValue] =
    useState<SingleValue<SelectOptionType>>(null);

  return (
    <Select
      {...args}
      options={[
        { label: 'Test1', value: 'Test1' },
        { label: 'Test2', value: 'Test2' },
        { label: 'Test3', value: 'Test3' },
      ]}
      value={selectValue}
      onChange={(value: SingleValue<SelectOptionType>) => setSelectValue(value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = { placeholder: 'Default Select' };
