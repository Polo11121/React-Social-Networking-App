import { ReactNode } from 'react';
import { Story, Meta } from '@storybook/react';
import { SectionCard } from 'components';

export default {
  component: SectionCard,
  title: 'SectionCard',
} as Meta;

const Template: Story<{
  sectionTitle?: string;
  children: ReactNode;
}> = (args) => <SectionCard {...args} />;

export const Default = Template.bind({});
Default.args = { children: <h1>test</h1> };

export const WithTitle = Template.bind({});
WithTitle.args = { sectionTitle: 'test', children: <h1>test</h1> };
