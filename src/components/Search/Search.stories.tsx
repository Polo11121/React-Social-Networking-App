import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { SearchPropsType } from 'components/Search/Search';
import { Search } from 'components';

export default {
  component: Search,
  title: 'Search',
} as Meta;

const Template: Story<SearchPropsType> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <Search
      {...args}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = { value: 'Test', placeholder: 'Default Search' };

export const SearchWithoutLoupe = Template.bind({});
SearchWithoutLoupe.args = {
  value: 'Test',
  placeholder: 'Default Search',
  hideIcon: true,
};
